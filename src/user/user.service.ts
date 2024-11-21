import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import authConfig from '../common/configs/authConfig';
import { ConfigType } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import mailerConfig from 'src/common/configs/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(authConfig.KEY)
    private authConf: ConfigType<typeof authConfig>,
    private mailService: MailService,
    private jwtService: JwtService,
    @Inject(mailerConfig.KEY)
    private mailerConf: ConfigType<typeof mailerConfig>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Hash password
    const password = createUserDto.password;
    const hashedPassword = await hash(password, this.authConf.bcryptSalt);
    // Check if user with this email already exists
    const existingUser = await this.findByEmail(createUserDto.email);
    // If user with this email already exists, throw an error
    if (existingUser)
      throw new ConflictException('User with this email already exists');
    // Create user
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString(); // 6 digit code
    const user = await this.userRepository.save({
      ...createUserDto,
      verificationCode,
      password: hashedPassword,
      birthDate: new Date(createUserDto.birthDate), // Convert string to timestamp
      isEmailVerified: false,
    });
    // Send verification code to user's email
    try {
      await this.mailService.sendVerificationCode({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        verificationCode: user.verificationCode,
      });
    } catch (error) {
      console.error(error);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async verifyEmail(token: string) {
    let decoded: any;
    try {
      decoded = this.jwtService.verify(token, {
        secret: this.mailerConf.verificationSecret,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new BadRequestException(
          'Verification link has expired. Please request a resend verification link.',
        );
      throw new BadRequestException('Invalid verification link.');
    }

    const user = await this.findByEmail(decoded.email);
    if (!user) throw new NotFoundException('User not found.');
    if (user.isEmailVerified)
      throw new BadRequestException('This email is already verified.');
    await this.userRepository.update(user.id, { isEmailVerified: true });
    return;
  }

  async resendVerificationLink(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException('User not found.');
    if (user.isEmailVerified)
      throw new BadRequestException('This email is already verified.');
    await this.mailService.sendVerificationCode({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      verificationCode: user.verificationCode,
    });
    return;
  }
}

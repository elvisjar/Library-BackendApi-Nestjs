import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new NotFoundException('An user with this email does not exist');

    if (!user.isEmailVerified)
      throw new UnauthorizedException('Please verify your email');

    const isPasswordValid = await compare(pass, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const { id, firstName, lastName, phoneNumber } = user;
    const payload = { id };
    const token = await this.jwtService.signAsync(payload);
    return { token, user: { firstName, lastName, phoneNumber, email } };
  }
}

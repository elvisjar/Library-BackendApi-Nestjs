import { Type } from 'class-transformer';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { User } from 'src/user/entities/user.entity';
import { PickType } from '@nestjs/swagger';

class LoginUser extends PickType(User, [
  'firstName',
  'lastName',
  'phoneNumber',
  'email',
]) {}
export class LoginResponseDto extends ResponseDto {
  @Type(
    () =>
      class {
        token: string;
        user: LoginUser;
      },
  )
  data: {
    token: string;
    user: LoginUser;
  };
}

import { registerAs } from '@nestjs/config';

export interface AuthConfig {
  bcryptSalt: number;
  jwtConfig: {
    secret: string;
    expiresIn: string;
  };
}

export default registerAs(
  'auth',
  (): AuthConfig => ({
    bcryptSalt: parseInt(process.env.BCRYPT_SALT),
    jwtConfig: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  }),
);

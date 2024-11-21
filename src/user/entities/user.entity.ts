import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 250, name: 'first_name' })
  firstName: string;

  @Column('varchar', { length: 250, name: 'last_name' })
  lastName: string;

  @Column('varchar', { length: 250, unique: true })
  email: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @Column('timestamp', { name: 'birth_date' })
  birthDate: Date;

  @Column('varchar', { name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column('enum', { enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column('varchar', { length: 6, nullable: true, name: 'verification_code' })
  verificationCode: string;

  @Column('boolean', { default: false })
  isEmailVerified: boolean;
}

import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}

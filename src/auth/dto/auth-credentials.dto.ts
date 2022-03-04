import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;


  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))/,{message: 'password: contain at least 1 number or special character'})
  @Matches(/(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message: 'password: contain at least 1 upper and 1 lower'})
  password: string;
}

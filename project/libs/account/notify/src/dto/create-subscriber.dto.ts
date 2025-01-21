import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'Min 6 chars, at least 1 uppercase, 1 number',
  })
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'password must contain at least one uppercase letter and one number',
  })
  password: string;
}

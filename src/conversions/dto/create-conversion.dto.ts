import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateConversionDto {
  @ApiProperty({
    example: 100,
    description: 'Monetary value to be converted',
  })
  @IsNumber()
  @Min(0.01, {
    message: 'Amount must be greater than zero',
  })
  amount: number;

  @ApiProperty({
    example: 'BRL',
    description: 'Source currency',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Source currency is required',
  })
  @Length(3, 3, {
    message: 'Currency must contain exactly 3 letters',
  })
  fromCurrency: string;
}
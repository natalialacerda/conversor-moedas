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
    description: 'Valor monetário a ser convertido',
  })
  @IsNumber()
  @Min(0.01, {
    message:
      'O valor deve ser maior que zero',
  })
  amount: number;

  @ApiProperty({
    example: 'BRL',
    description: 'Moeda de origem',
  })
  @IsString()
  @IsNotEmpty({
    message:
      'A moeda de origem é obrigatória',
  })
  @Length(3, 3, {
    message:
      'A moeda deve conter exatamente 3 letras',
  })
  fromCurrency: string;
}
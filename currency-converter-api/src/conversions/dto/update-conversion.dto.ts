import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateConversionDto {
  @ApiPropertyOptional({
    example: 200,
    description:
      'Novo valor da conversão',
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01, {
    message:
      'O valor deve ser maior que zero',
  })
  amount?: number;

  @ApiPropertyOptional({
    example: 'USD',
    description:
      'Nova moeda de origem',
  })
  @IsOptional()
  @IsString()
  @Length(3, 3, {
    message:
      'A moeda deve conter exatamente 3 letras',
  })
  fromCurrency?: string;
}
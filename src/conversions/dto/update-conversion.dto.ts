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
    description: 'New conversion amount',
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01, {
    message: 'Amount must be greater than zero',
  })
  amount?: number;

  @ApiPropertyOptional({
    example: 'USD',
    description: 'New source currency',
  })
  @IsOptional()
  @IsString()
  @Length(3, 3, {
    message: 'Currency must contain exactly 3 letters',
  })
  fromCurrency?: string;
}
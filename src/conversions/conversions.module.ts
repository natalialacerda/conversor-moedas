import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { Conversion } from './entities/conversion.entity';

import { ConversionsController } from './conversions.controller';

import { ConversionsService } from './conversions.service';

import { CurrencyApiService } from './currency-api.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conversion,
    ]),

    HttpModule,
  ],

  controllers: [
    ConversionsController,
  ],

  providers: [
    ConversionsService,
    CurrencyApiService,
  ],
})
export class ConversionsModule {}
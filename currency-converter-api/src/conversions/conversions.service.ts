import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
  Repository,
  Between,
} from 'typeorm';

import { Conversion } from './entities/conversion.entity';

import { CreateConversionDto } from './dto/create-conversion.dto';

import { UpdateConversionDto } from './dto/update-conversion.dto';

import { CurrencyApiService } from './currency-api.service';

@Injectable()
export class ConversionsService {
  constructor(
    @InjectRepository(Conversion)
    private readonly repository: Repository<Conversion>,

    private readonly currencyApiService: CurrencyApiService,
  ) {}

  async create(data: CreateConversionDto) {
    if (data.amount <= 0) {
      throw new BadRequestException(
        'O valor deve ser maior que zero',
      );
    }

    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    const amanha = new Date(hoje);

    amanha.setDate(
      amanha.getDate() + 1,
    );

    const totalConversoes =
      await this.repository.count({
        where: {
          fromCurrency:
            data.fromCurrency,

          createdAt: Between(
            hoje,
            amanha,
          ),
        },
      });

    if (totalConversoes >= 3) {
      throw new BadRequestException(
        'Limite diário de 3 conversões atingido para esta moeda',
      );
    }

    const rates =
      await this.currencyApiService.getRates(
        data.fromCurrency,
      );

    if (!rates.USD || !rates.EUR) {
      throw new BadRequestException(
        'Moeda inválida',
      );
    }

    const usdValue = Number(
      (
        data.amount * rates.USD
      ).toFixed(2),
    );

    const eurValue = Number(
      (
        data.amount * rates.EUR
      ).toFixed(2),
    );

    const conversion =
      this.repository.create({
        amount: data.amount,

        fromCurrency:
          data.fromCurrency,

        usdValue,

        eurValue,
      });

    return this.repository.save(
      conversion,
    );
  }

  async findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const conversion =
      await this.repository.findOne({
        where: { id },
      });

    if (!conversion) {
      throw new NotFoundException(
        'Conversão não encontrada',
      );
    }

    return conversion;
  }

  async update(
    id: number,
    data: UpdateConversionDto,
  ) {
    const conversion =
      await this.findOne(id);

    const amount =
      data.amount ??
      conversion.amount;

    const fromCurrency =
      data.fromCurrency ??
      conversion.fromCurrency;

    if (amount <= 0) {
      throw new BadRequestException(
        'O valor deve ser maior que zero',
      );
    }

    const rates =
      await this.currencyApiService.getRates(
        fromCurrency,
      );

    if (!rates.USD || !rates.EUR) {
      throw new BadRequestException(
        'Moeda inválida',
      );
    }

    conversion.amount = amount;

    conversion.fromCurrency =
      fromCurrency;

    conversion.usdValue = Number(
      (
        amount * rates.USD
      ).toFixed(2),
    );

    conversion.eurValue = Number(
      (
        amount * rates.EUR
      ).toFixed(2),
    );

    return this.repository.save(
      conversion,
    );
  }

  async remove(id: number) {
    const conversion =
      await this.findOne(id);

    await this.repository.remove(
      conversion,
    );

    return {
      message:
        'Conversão excluída com sucesso',
    };
  }
}
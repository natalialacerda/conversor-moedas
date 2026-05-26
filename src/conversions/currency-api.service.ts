import { HttpService } from '@nestjs/axios';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyApiService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getRates(currency: string) {
    try {
      const response: any =
        await firstValueFrom(
          this.httpService.get(
            `https://open.er-api.com/v6/latest/${currency}`,
          ),
        );

      const rates =
        response.data.rates;

      if (!rates) {
        throw new BadRequestException(
          'Não foi possível obter as taxas de câmbio',
        );
      }

      return rates;
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException(
        'Erro ao consultar API de câmbio',
      );
    }
  }
}
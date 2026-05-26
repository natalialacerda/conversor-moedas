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

      const data = response.data;

      if (
        !data ||
        data.result === 'error' ||
        !data.rates
      ) {
        throw new BadRequestException(
          'Código de moeda inválido',
        );
      }

      return data.rates;
    } catch (error) {
      console.error(error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao consultar API de câmbio',
      );
    }
  }
}
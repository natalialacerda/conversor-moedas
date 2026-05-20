import { HttpService } from '@nestjs/axios';
export declare class CurrencyApiService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getRates(currency: string): unknown;
}

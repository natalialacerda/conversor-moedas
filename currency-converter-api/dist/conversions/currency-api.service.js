"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let CurrencyApiService = class CurrencyApiService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getRates(currency) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://open.er-api.com/v6/latest/${currency}`));
            const rates = response.data.rates;
            if (!rates) {
                throw new common_1.BadRequestException('Não foi possível obter as taxas de câmbio');
            }
            return rates;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao consultar API de câmbio');
        }
    }
};
exports.CurrencyApiService = CurrencyApiService;
exports.CurrencyApiService = CurrencyApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], CurrencyApiService);
//# sourceMappingURL=currency-api.service.js.map
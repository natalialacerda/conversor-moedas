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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const conversion_entity_1 = require("./entities/conversion.entity");
const currency_api_service_1 = require("./currency-api.service");
let ConversionsService = class ConversionsService {
    repository;
    currencyApiService;
    constructor(repository, currencyApiService) {
        this.repository = repository;
        this.currencyApiService = currencyApiService;
    }
    async create(data) {
        if (data.amount <= 0) {
            throw new common_1.BadRequestException('O valor deve ser maior que zero');
        }
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const amanha = new Date(hoje);
        amanha.setDate(amanha.getDate() + 1);
        const totalConversoes = await this.repository.count({
            where: {
                fromCurrency: data.fromCurrency,
                createdAt: (0, typeorm_2.Between)(hoje, amanha),
            },
        });
        if (totalConversoes >= 3) {
            throw new common_1.BadRequestException('Limite diário de 3 conversões atingido para esta moeda');
        }
        const rates = await this.currencyApiService.getRates(data.fromCurrency);
        if (!rates.USD || !rates.EUR) {
            throw new common_1.BadRequestException('Moeda inválida');
        }
        const usdValue = Number((data.amount * rates.USD).toFixed(2));
        const eurValue = Number((data.amount * rates.EUR).toFixed(2));
        const conversion = this.repository.create({
            amount: data.amount,
            fromCurrency: data.fromCurrency,
            usdValue,
            eurValue,
        });
        return this.repository.save(conversion);
    }
    async findAll() {
        return this.repository.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findOne(id) {
        const conversion = await this.repository.findOne({
            where: { id },
        });
        if (!conversion) {
            throw new common_1.NotFoundException('Conversão não encontrada');
        }
        return conversion;
    }
    async update(id, data) {
        const conversion = await this.findOne(id);
        const amount = data.amount ??
            conversion.amount;
        const fromCurrency = data.fromCurrency ??
            conversion.fromCurrency;
        if (amount <= 0) {
            throw new common_1.BadRequestException('O valor deve ser maior que zero');
        }
        const rates = await this.currencyApiService.getRates(fromCurrency);
        if (!rates.USD || !rates.EUR) {
            throw new common_1.BadRequestException('Moeda inválida');
        }
        conversion.amount = amount;
        conversion.fromCurrency =
            fromCurrency;
        conversion.usdValue = Number((amount * rates.USD).toFixed(2));
        conversion.eurValue = Number((amount * rates.EUR).toFixed(2));
        return this.repository.save(conversion);
    }
    async remove(id) {
        const conversion = await this.findOne(id);
        await this.repository.remove(conversion);
        return {
            message: 'Conversão excluída com sucesso',
        };
    }
};
exports.ConversionsService = ConversionsService;
exports.ConversionsService = ConversionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversion_entity_1.Conversion)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, currency_api_service_1.CurrencyApiService])
], ConversionsService);
//# sourceMappingURL=conversions.service.js.map
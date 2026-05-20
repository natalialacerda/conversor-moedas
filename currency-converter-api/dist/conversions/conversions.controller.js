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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionsController = void 0;
const common_1 = require("@nestjs/common");
const conversions_service_1 = require("./conversions.service");
const create_conversion_dto_1 = require("./dto/create-conversion.dto");
const update_conversion_dto_1 = require("./dto/update-conversion.dto");
const swagger_1 = require("@nestjs/swagger");
let ConversionsController = class ConversionsController {
    conversionsService;
    constructor(conversionsService) {
        this.conversionsService = conversionsService;
    }
    criar(createConversionDto) {
        return this.conversionsService.create(createConversionDto);
    }
    listar() {
        return this.conversionsService.findAll();
    }
    buscar(id) {
        return this.conversionsService.findOne(id);
    }
    atualizar(id, updateConversionDto) {
        return this.conversionsService.update(id, updateConversionDto);
    }
    remover(id) {
        return this.conversionsService.remove(id);
    }
};
exports.ConversionsController = ConversionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar conversão',
        description: 'Cria uma conversão monetária a partir de uma moeda de origem e retorna os valores convertidos para USD e EUR.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Conversão criada com sucesso',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Dados inválidos ou limite diário de conversões atingido',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversion_dto_1.CreateConversionDto]),
    __metadata("design:returntype", void 0)
], ConversionsController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar conversões',
        description: 'Lista todas as conversões salvas no banco de dados.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de conversões retornada com sucesso',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConversionsController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar conversão por ID',
        description: 'Busca uma conversão específica pelo seu ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: 1,
        description: 'ID da conversão',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Conversão encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Conversão não encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConversionsController.prototype, "buscar", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar conversão',
        description: 'Atualiza uma conversão existente e recalcula os valores em USD e EUR.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: 1,
        description: 'ID da conversão',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Conversão atualizada com sucesso',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Conversão não encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_conversion_dto_1.UpdateConversionDto]),
    __metadata("design:returntype", void 0)
], ConversionsController.prototype, "atualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Excluir conversão',
        description: 'Remove uma conversão existente do banco de dados.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: 1,
        description: 'ID da conversão',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Conversão excluída com sucesso',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Conversão não encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConversionsController.prototype, "remover", null);
exports.ConversionsController = ConversionsController = __decorate([
    (0, swagger_1.ApiTags)('Conversões'),
    (0, common_1.Controller)('conversions'),
    __metadata("design:paramtypes", [conversions_service_1.ConversionsService])
], ConversionsController);
//# sourceMappingURL=conversions.controller.js.map
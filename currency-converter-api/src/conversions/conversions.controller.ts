import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { ConversionsService } from './conversions.service';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { UpdateConversionDto } from './dto/update-conversion.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Conversões')
@Controller('conversions')
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar conversão',
    description:
      'Cria uma conversão monetária a partir de uma moeda de origem e retorna os valores convertidos para USD e EUR.',
  })
  @ApiResponse({
    status: 201,
    description: 'Conversão criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou limite diário de conversões atingido',
  })
  criar(@Body() createConversionDto: CreateConversionDto) {
    return this.conversionsService.create(createConversionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar conversões',
    description: 'Lista todas as conversões salvas no banco de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de conversões retornada com sucesso',
  })
  listar() {
    return this.conversionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar conversão por ID',
    description: 'Busca uma conversão específica pelo seu ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID da conversão',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversão encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversão não encontrada',
  })
  buscar(@Param('id', ParseIntPipe) id: number) {
    return this.conversionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar conversão',
    description:
      'Atualiza uma conversão existente e recalcula os valores em USD e EUR.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID da conversão',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversão atualizada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversão não encontrada',
  })
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConversionDto: UpdateConversionDto,
  ) {
    return this.conversionsService.update(id, updateConversionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Excluir conversão',
    description: 'Remove uma conversão existente do banco de dados.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'ID da conversão',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversão excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversão não encontrada',
  })
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.conversionsService.remove(id);
  }
}
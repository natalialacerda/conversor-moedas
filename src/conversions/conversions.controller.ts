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

@ApiTags('Conversions')
@Controller('conversions')
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create conversion',
    description:
      'Creates a currency conversion from a source currency and returns the converted values in USD and EUR.',
  })
  @ApiResponse({
    status: 201,
    description: 'Conversion created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or daily conversion limit reached',
  })
  create(@Body() createConversionDto: CreateConversionDto) {
    return this.conversionsService.create(createConversionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all conversions',
    description: 'Returns all conversions saved in the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversions returned successfully',
  })
  findAll() {
    return this.conversionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get conversion by ID',
    description: 'Returns a specific conversion by its ID.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Conversion ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversion found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversion not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.conversionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update conversion',
    description:
      'Updates an existing conversion and recalculates the values in USD and EUR.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Conversion ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversion updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversion not found',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConversionDto: UpdateConversionDto,
  ) {
    return this.conversionsService.update(id, updateConversionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete conversion',
    description: 'Deletes an existing conversion from the database.',
  })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Conversion ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversion deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversion not found',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.conversionsService.remove(id);
  }
}
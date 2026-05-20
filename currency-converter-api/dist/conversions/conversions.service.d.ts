import { Repository } from 'typeorm';
import { Conversion } from './entities/conversion.entity';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { UpdateConversionDto } from './dto/update-conversion.dto';
import { CurrencyApiService } from './currency-api.service';
export declare class ConversionsService {
    private readonly repository;
    private readonly currencyApiService;
    constructor(repository: Repository<Conversion>, currencyApiService: CurrencyApiService);
    create(data: CreateConversionDto): unknown;
    findAll(): unknown;
    findOne(id: number): unknown;
    update(id: number, data: UpdateConversionDto): unknown;
    remove(id: number): unknown;
}

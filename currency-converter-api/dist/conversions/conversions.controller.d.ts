import { ConversionsService } from './conversions.service';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { UpdateConversionDto } from './dto/update-conversion.dto';
export declare class ConversionsController {
    private readonly conversionsService;
    constructor(conversionsService: ConversionsService);
    criar(createConversionDto: CreateConversionDto): unknown;
    listar(): unknown;
    buscar(id: number): unknown;
    atualizar(id: number, updateConversionDto: UpdateConversionDto): unknown;
    remover(id: number): unknown;
}

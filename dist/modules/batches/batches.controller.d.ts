import { BatchesService } from './batches.service';
import { AddBatchDto, UpdateBatchDto, EnrollStudentDto, RemoveStudentDto } from './dto/batches.dto';
export declare class BatchesController {
    private readonly batchesService;
    constructor(batchesService: BatchesService);
    add(dto: AddBatchDto): Promise<any>;
    getAll(): Promise<any>;
    getById(id: number): Promise<{
        ok: boolean;
        msg: string;
        data?: undefined;
    } | {
        ok: boolean;
        data: any;
        msg?: undefined;
    }>;
    update(dto: UpdateBatchDto): Promise<any>;
    delete(id: number): Promise<any>;
    enrollStudent(dto: EnrollStudentDto): Promise<any>;
    removeStudent(dto: RemoveStudentDto): Promise<any>;
    getStudents(id: number): Promise<any>;
}

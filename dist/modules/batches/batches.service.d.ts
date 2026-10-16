import { DatabaseService } from '../../database/database.service';
import { AddBatchDto, UpdateBatchDto, EnrollStudentDto, RemoveStudentDto } from './dto/batches.dto';
export declare class BatchesService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
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
    getStudents(batchId: number): Promise<any>;
}

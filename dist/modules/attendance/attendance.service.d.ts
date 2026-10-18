import { DatabaseService } from '../../database/database.service';
import { AddAttendanceDto, BulkMarkAttendanceDto, UpdateAttendanceDto } from './dto/attendance.dto';
export declare class AttendanceService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    add(dto: AddAttendanceDto): Promise<any>;
    bulkAdd(dto: BulkMarkAttendanceDto): Promise<{
        ok: boolean;
        msg: string;
        total?: undefined;
        successCount?: undefined;
        failCount?: undefined;
        results?: undefined;
    } | {
        ok: boolean;
        msg: string;
        total: number;
        successCount: number;
        failCount: number;
        results: any[];
    }>;
    update(dto: UpdateAttendanceDto): Promise<any>;
    getAll(): Promise<any>;
    getById(id: number): Promise<{
        ok: boolean;
        msg: string;
        data?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        data: any;
        msg?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        error: any;
        data?: undefined;
    }>;
    getBySession(sessionId: number): Promise<any>;
    getByStudent(usersId: number): Promise<any>;
    getByBatch(batchesId: number): Promise<any>;
    getByDate(date: string): Promise<any>;
    getPercentage(usersId: number): Promise<{
        ok: boolean;
        msg: string;
        data?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        data: any;
        msg?: undefined;
        error?: undefined;
    } | {
        ok: boolean;
        msg: string;
        error: any;
        data?: undefined;
    }>;
    delete(id: number): Promise<any>;
}

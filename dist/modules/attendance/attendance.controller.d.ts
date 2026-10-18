import { AttendanceService } from './attendance.service';
import { AddAttendanceDto, BulkMarkAttendanceDto, UpdateAttendanceDto, GetAttendanceByDateDto } from './dto/attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
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
    update(dto: UpdateAttendanceDto): Promise<any>;
    getBySession(id: number): Promise<any>;
    getByStudent(id: number): Promise<any>;
    getByBatch(id: number): Promise<any>;
    getByDate(dto: GetAttendanceByDateDto): Promise<any>;
    getByDateParam(date: string): Promise<any>;
    getPercentage(id: number): Promise<{
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

import { DatabaseService } from '../../database/database.service';
export declare class StudentService {
    private readonly db;
    private readonly logger;
    constructor(db: DatabaseService);
    quickAdd(c: any): Promise<any>;
    add(u: any): Promise<any>;
    authenticate(body: any): Promise<any>;
    getAll(): Promise<any>;
    details(studentId: string): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        data?: undefined;
    }>;
    update(s: any): Promise<any>;
    search(s: any): Promise<any>;
    updateLanguage(body: any): Promise<{
        ok: boolean;
        msg: string;
        student?: undefined;
        user?: undefined;
    } | {
        ok: boolean;
        student: any;
        msg?: undefined;
        user?: undefined;
    } | {
        ok: boolean;
        msg: string;
        user: {};
        student?: undefined;
    }>;
    updateEmail(s: any): Promise<{
        ok: boolean;
        msg: string;
        status?: undefined;
        user?: undefined;
    } | {
        ok: boolean;
        status: any;
        msg?: undefined;
        user?: undefined;
    } | {
        ok: boolean;
        msg: string;
        user: {};
        status?: undefined;
    }>;
    updatePassword(s: any): Promise<{
        ok: boolean;
        msg: string;
        status?: undefined;
        user?: undefined;
    } | {
        ok: boolean;
        status: any;
        msg?: undefined;
        user?: undefined;
    } | {
        ok: boolean;
        msg: string;
        user: {};
        status?: undefined;
    }>;
    count(): Promise<{
        ok: boolean;
        total_students: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        total_students?: undefined;
    }>;
    getNextId(): Promise<any>;
    getNextRollNo(): Promise<{
        next_roll_no: any;
        error?: undefined;
    } | {
        error: string;
        next_roll_no?: undefined;
    }>;
    getSelf(sid: any): Promise<{
        ok: boolean;
        student: any;
        msg?: undefined;
        user?: undefined;
    } | {
        ok: boolean;
        msg: string;
        user: {};
        student?: undefined;
    }>;
}

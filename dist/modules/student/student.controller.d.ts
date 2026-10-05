import { StudentService } from './student.service';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    quickAdd(body: any): Promise<any>;
    add(body: any): Promise<any>;
    authenticate(body: any): Promise<any>;
    getAll(): Promise<any>;
    details(id: string): Promise<{
        ok: boolean;
        data: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        data?: undefined;
    }>;
    update(body: any): Promise<any>;
    search(body: any): Promise<any>;
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
    updateEmail(body: any): Promise<{
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
    updatePassword(body: any): Promise<{
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
    getSelf(user: any): Promise<{
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

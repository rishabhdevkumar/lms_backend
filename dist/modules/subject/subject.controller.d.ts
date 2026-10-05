import { SubjectService } from './subject.service';
export declare class SubjectController {
    private readonly subjectService;
    constructor(subjectService: SubjectService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    update(body: any): Promise<{
        ok: boolean;
        msg: string;
        result?: undefined;
    } | {
        ok: boolean;
        result: any;
        msg?: undefined;
    }>;
    search(body: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}

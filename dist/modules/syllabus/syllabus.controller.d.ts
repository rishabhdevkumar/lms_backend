import { SyllabusService } from './syllabus.service';
export declare class SyllabusController {
    private readonly syllabusService;
    constructor(syllabusService: SyllabusService);
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
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}

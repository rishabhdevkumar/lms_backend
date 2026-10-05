import { SessionService } from './session.service';
export declare class SessionController {
    private readonly sessionService;
    constructor(sessionService: SessionService);
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

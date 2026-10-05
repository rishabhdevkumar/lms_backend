import { CityService } from './city.service';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    update(body: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}

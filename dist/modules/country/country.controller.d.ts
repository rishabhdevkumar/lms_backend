import { CountryService } from './country.service';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    update(body: any): Promise<any>;
    search(body: any): Promise<any>;
    delete(id: string): Promise<{
        ok: boolean;
        msg: string;
    }>;
}

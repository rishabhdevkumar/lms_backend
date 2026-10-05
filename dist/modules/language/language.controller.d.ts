import { LanguageService } from './language.service';
export declare class LanguageController {
    private readonly languageService;
    constructor(languageService: LanguageService);
    getAll(): Promise<any>;
    getActive(): Promise<{
        ok: boolean;
        languages: any;
        msg?: undefined;
    } | {
        ok: boolean;
        msg: string;
        languages?: undefined;
    }>;
}

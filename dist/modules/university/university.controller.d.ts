import { UniversityService } from './university.service';
export declare class UniversityController {
    private readonly universityService;
    constructor(universityService: UniversityService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
}

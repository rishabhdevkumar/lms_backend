import { FacultyDepService } from './faculty-dep.service';
export declare class FacultyDepController {
    private readonly facultyDepService;
    constructor(facultyDepService: FacultyDepService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
}

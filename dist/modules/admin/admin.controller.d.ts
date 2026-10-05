import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    addAdmin(body: any): Promise<any>;
    authenticate(body: any): Promise<any>;
    getAll(): Promise<any>;
}

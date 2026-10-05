import { TimetableService } from './timetable.service';
export declare class TimetableController {
    private readonly timetableService;
    constructor(timetableService: TimetableService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
}

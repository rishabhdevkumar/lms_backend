import { RoomService } from './room.service';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
}

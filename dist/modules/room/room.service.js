"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RoomService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let RoomService = RoomService_1 = class RoomService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(RoomService_1.name);
    }
    async add(r) {
        if (!r.block_id || !r.room_no) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const data = await this.db.execute('CALL sp_room_add(?, ?)', [r.block_id, r.room_no]);
            return data[0][0];
        }
        catch (error) {
            this.logger.error('Error adding room:', error);
            return { ok: false, msg: 'An error occurred while adding room' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_room_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting rooms:', error);
            return [];
        }
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = RoomService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RoomService);
//# sourceMappingURL=room.service.js.map
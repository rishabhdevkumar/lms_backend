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
var DestrictService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestrictService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let DestrictService = DestrictService_1 = class DestrictService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(DestrictService_1.name);
    }
    async add(d) {
        if (!d.country_id || !d.state_id || !d.city_id || !d.destrict_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_destrict_add(?, ?, ?, ?)', [
                d.country_id,
                d.state_id,
                d.city_id,
                d.destrict_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding destrict:', error);
            return { ok: false, msg: 'An error occurred while adding destrict' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_destrict_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting destricts:', error);
            return [];
        }
    }
    async search(s) {
        try {
            const data = await this.db.execute('CALL sp_destrict_search(?,?,?,?)', [
                s.country_id,
                s.destrict_name || '',
                s.rc || 15,
                s.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching destricts:', error);
            return [];
        }
    }
    async update(s) {
        if (!s.id || !s.country_id || !s.state_id || !s.city_id || !s.destrict_name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_destrict_update(?, ?, ?, ?, ?)', [
                s.id,
                s.country_id,
                s.state_id,
                s.city_id,
                s.destrict_name,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error updating destrict:', error);
            return { ok: false, msg: 'Failed to update destrict' };
        }
    }
    async delete(s) {
        const destId = typeof s === 'object' ? s.state_id || s.id : s;
        if (!destId) {
            return { ok: false, msg: 'state id is mandotory' };
        }
        try {
            const data = await this.db.execute('CALL sp_destrict_delete(?)', [destId]);
            return data[0][0];
        }
        catch (error) {
            this.logger.error('Error deleting destrict:', error);
            return { ok: false, msg: 'Failed to delete destrict' };
        }
    }
};
exports.DestrictService = DestrictService;
exports.DestrictService = DestrictService = DestrictService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DestrictService);
//# sourceMappingURL=destrict.service.js.map
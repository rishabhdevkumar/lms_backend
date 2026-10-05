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
var CityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let CityService = CityService_1 = class CityService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(CityService_1.name);
    }
    async add(c) {
        if (!c.country_id || !c.state_id || !c.name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_city_add(?, ?, ?)', [
                c.country_id,
                c.state_id,
                c.name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding city:', error);
            return { ok: false, msg: 'An error occurred while adding the city' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_city_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting cities:', error);
            return [];
        }
    }
    async update(s) {
        if (!s.id || !s.country_id || !s.state_id || !s.name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_city_update(?, ?, ?, ?)', [
                s.id,
                s.country_id,
                s.state_id,
                s.name,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error updating city:', error);
            return { ok: false, msg: 'Failed to update city' };
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_city_delete(?)', [id]);
            return { ok: true, msg: 'City deleted successfully' };
        }
        catch (error) {
            this.logger.error('Error deleting city:', error);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.CityService = CityService;
exports.CityService = CityService = CityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CityService);
//# sourceMappingURL=city.service.js.map
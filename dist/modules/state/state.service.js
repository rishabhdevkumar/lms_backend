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
var StateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let StateService = StateService_1 = class StateService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(StateService_1.name);
    }
    async add(s) {
        if (!s.country_id || !s.state_name || !s.short_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_state_add(?, ?, ?)', [
                s.country_id,
                s.state_name,
                s.short_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding state:', error);
            return { ok: false, msg: 'An error occurred while adding the state' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_state_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting states:', error);
            return [];
        }
    }
    async search(s) {
        try {
            const data = await this.db.execute('CALL sp_state_search(?,?,?,?,?)', [
                s.country_id,
                s.state_name || '',
                s.short_name || '',
                s.rc || 15,
                s.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching states:', error);
            return [];
        }
    }
    async update(s) {
        if (!s.id || !s.country_id || !s.state_name || !s.short_name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_state_update(?,?,?,?)', [
                s.id,
                s.country_id,
                s.state_name,
                s.short_name,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error updating state:', error);
            return { ok: false, msg: 'Failed to update state' };
        }
    }
    async delete(s) {
        const stateId = typeof s === 'object' ? s.state_id || s.id : s;
        if (!stateId) {
            return { ok: false, msg: 'state id is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_state_delete(?)', [stateId]);
            return data[0][0];
        }
        catch (error) {
            this.logger.error('Error deleting state:', error);
            return { ok: false, msg: 'Failed to delete state' };
        }
    }
};
exports.StateService = StateService;
exports.StateService = StateService = StateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], StateService);
//# sourceMappingURL=state.service.js.map
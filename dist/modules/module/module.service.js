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
var ModuleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let ModuleService = ModuleService_1 = class ModuleService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(ModuleService_1.name);
    }
    async add(mo) {
        if (!mo.module_name) {
            return { ok: false, msg: 'This field are Mandatory' };
        }
        try {
            const result = await this.db.execute('CALL sp_module_add(?)', [mo.module_name]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding module:', error);
            return { ok: false, msg: 'An error occurred while adding the module' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_module_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting modules:', error);
            return [];
        }
    }
    async update(mo) {
        if (!mo.id || !mo.module_name) {
            return { ok: false, msg: 'This fields is Mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_module_update(?,?)', [mo.id, mo.module_name]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error updating module:', error);
            return { ok: false, msg: 'Failed to update module' };
        }
    }
    async search(mo) {
        try {
            const data = await this.db.execute('CALL sp_module_search(?,?,?)', [
                mo.module_name || '',
                mo.rc || 3,
                mo.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching modules:', error);
            return [];
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_module_delete(?)', [id]);
            return { ok: true, msg: 'Module deleted successfully' };
        }
        catch (err) {
            this.logger.error('Delete module error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.ModuleService = ModuleService;
exports.ModuleService = ModuleService = ModuleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ModuleService);
//# sourceMappingURL=module.service.js.map
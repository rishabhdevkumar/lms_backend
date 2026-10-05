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
var ModuleTablesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTablesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let ModuleTablesService = ModuleTablesService_1 = class ModuleTablesService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(ModuleTablesService_1.name);
    }
    async add(t) {
        if (!t.module_id || !t.table_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_module_tables_add(?, ?)', [
                t.module_id,
                t.table_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding module table:', error);
            return { ok: false, msg: 'An error occurred while adding module table' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_module_tables_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting module tables:', error);
            return [];
        }
    }
    async update(m) {
        if (!m.id || !m.table_name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_module_tables_update(?,?)', [m.id, m.table_name]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error updating module table:', error);
            return { ok: false, msg: 'Failed to update module table' };
        }
    }
    async search(m) {
        try {
            const data = await this.db.execute('CALL sp_module_tables_search(?,?,?)', [
                m.table_name || '',
                m.rc || 5,
                m.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching module tables:', error);
            return [];
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_module_tables_delete(?)', [id]);
            return { ok: true, msg: 'Table deleted successfully' };
        }
        catch (err) {
            this.logger.error('Delete module table error:', err);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.ModuleTablesService = ModuleTablesService;
exports.ModuleTablesService = ModuleTablesService = ModuleTablesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ModuleTablesService);
//# sourceMappingURL=module-tables.service.js.map
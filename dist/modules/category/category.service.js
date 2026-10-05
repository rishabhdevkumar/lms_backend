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
var CategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let CategoryService = CategoryService_1 = class CategoryService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(CategoryService_1.name);
    }
    async add(c) {
        if (!c.module_id || !c.category_name || !c.short_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_category_add(?, ?, ?)', [
                c.module_id,
                c.category_name,
                c.short_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding category:', error);
            return { ok: false, msg: 'An error occurred while adding the category' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_category_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting categories:', error);
            return [];
        }
    }
    async update(c) {
        if (!c.id || !c.category_name || !c.short_name) {
            return { ok: false, msg: 'All data is mandatory' };
        }
        try {
            const data = await this.db.execute('CALL sp_category_update(?,?,?)', [
                c.id,
                c.category_name,
                c.short_name,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error updating category:', error);
            return { ok: false, msg: 'Failed to update category' };
        }
    }
    async search(c) {
        try {
            const data = await this.db.execute('CALL sp_category_search(?,?,?,?)', [
                c.category_name || '',
                c.short_name || '',
                c.rc || 5,
                c.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching categories:', error);
            return [];
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_category_delete(?)', [id]);
            return { ok: true, msg: 'Category deleted successfully' };
        }
        catch (error) {
            this.logger.error('Error deleting category:', error);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = CategoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CategoryService);
//# sourceMappingURL=category.service.js.map
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
var SubCategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let SubCategoryService = SubCategoryService_1 = class SubCategoryService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(SubCategoryService_1.name);
    }
    async add(c) {
        if (!c.module_id || !c.category_id || !c.sub_category_name) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const result = await this.db.execute('CALL sp_sub_category_add(?, ?, ?)', [
                c.module_id,
                c.category_id,
                c.sub_category_name,
            ]);
            return result[0][0];
        }
        catch (error) {
            this.logger.error('Error adding sub category:', error);
            return { ok: false, msg: 'An error occurred while adding sub category' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_sub_category_getall()', []);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error getting sub categories:', error);
            return [];
        }
    }
    async update(u) {
        try {
            const data = await this.db.execute('CALL sp_sub_category_update(?, ?, ?, ?)', [
                u.id,
                u.module_id || null,
                u.category_id || null,
                u.sub_category_name || null,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error updating sub category:', error);
            return { ok: false, msg: 'Failed to update sub category' };
        }
    }
    async search(c) {
        try {
            const data = await this.db.execute('CALL sp_sub_category_search(?, ?, ?)', [
                c.sub_category_name || '',
                c.rc || 10,
                c.page || 1,
            ]);
            return data[0];
        }
        catch (error) {
            this.logger.error('Error searching sub categories:', error);
            return [];
        }
    }
    async delete(id) {
        try {
            await this.db.execute('CALL sp_sub_category_delete(?)', [id]);
            return { ok: true, msg: 'Sub category deleted successfully' };
        }
        catch (error) {
            this.logger.error('Error deleting sub category:', error);
            return { ok: false, msg: 'Server error' };
        }
    }
};
exports.SubCategoryService = SubCategoryService;
exports.SubCategoryService = SubCategoryService = SubCategoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SubCategoryService);
//# sourceMappingURL=sub-category.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor() {
        this.logger = new common_1.Logger(DatabaseService_1.name);
    }
    async onModuleInit() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'Management_project',
            port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        this.logger.log('Database pool initialized successfully');
    }
    async onModuleDestroy() {
        if (this.pool) {
            await this.pool.end();
            this.logger.log('Database pool closed');
        }
    }
    async execute(sql, params = []) {
        try {
            const sanitizedParams = (params || []).map((p) => (p === undefined ? null : p));
            const [rows] = await this.pool.execute(sql, sanitizedParams);
            return rows;
        }
        catch (error) {
            this.logger.error(`Database execute error for query "${sql}":`, error);
            throw error;
        }
    }
    async query(sql, params = []) {
        try {
            const sanitizedParams = (params || []).map((p) => (p === undefined ? null : p));
            const [rows] = await this.pool.query(sql, sanitizedParams);
            return rows;
        }
        catch (error) {
            this.logger.error(`Database query error for query "${sql}":`, error);
            throw error;
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map
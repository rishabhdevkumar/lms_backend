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
var SubAgentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubAgentService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let SubAgentService = SubAgentService_1 = class SubAgentService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(SubAgentService_1.name);
    }
    async addSubAgent(sub) {
        if (!sub.name || !sub.email || !sub.password) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const data = await this.db.execute('CALL sp_sub_agent_add(?, ?, ?, ?, ?, ?, ?, ?)', [
                sub.agent_id,
                sub.name,
                sub.email,
                sub.password,
                sub.dob,
                sub.phone,
                sub.whatsapp_number,
                sub.organisation,
            ]);
            return data[0][0];
        }
        catch (error) {
            this.logger.error('Error adding sub agent:', error);
            return { ok: false, msg: 'An error occurred while adding sub agent' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_sub_agent_getall()', []);
            let subAgents = data[0] || [];
            subAgents = subAgents.map((sub) => {
                if (sub.dob) {
                    const date = new Date(sub.dob);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    sub.dob = `${yyyy}-${mm}-${dd}`;
                }
                return sub;
            });
            return subAgents;
        }
        catch (error) {
            this.logger.error('Error getting sub agents:', error);
            return [];
        }
    }
};
exports.SubAgentService = SubAgentService;
exports.SubAgentService = SubAgentService = SubAgentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SubAgentService);
//# sourceMappingURL=sub-agent.service.js.map
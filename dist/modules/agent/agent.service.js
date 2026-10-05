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
var AgentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let AgentService = AgentService_1 = class AgentService {
    constructor(db) {
        this.db = db;
        this.logger = new common_1.Logger(AgentService_1.name);
    }
    async addAgent(ag) {
        if (!ag.agent_name || !ag.email || !ag.password) {
            return { ok: false, msg: 'All fields are required' };
        }
        try {
            const data = await this.db.execute('CALL sp_agent_add(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                ag.country_id,
                ag.state_id,
                ag.agent_name,
                ag.email,
                ag.password,
                ag.dob,
                ag.phone,
                ag.whatsapp_no,
                ag.organisation,
                ag.aadhar_number,
                ag.pan_number,
                ag.bank_name,
                ag.account_no,
                ag.account_name,
                ag.ifsc_code,
            ]);
            return data[0][0];
        }
        catch (error) {
            this.logger.error('Error adding agent:', error);
            return { ok: false, msg: 'An error occurred while adding the agent' };
        }
    }
    async getAll() {
        try {
            const data = await this.db.execute('CALL sp_agent_getall()', []);
            let agents = data[0] || [];
            agents = agents.map((agent) => {
                if (agent.dob) {
                    const date = new Date(agent.dob);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    agent.dob = `${yyyy}-${mm}-${dd}`;
                }
                return agent;
            });
            return agents;
        }
        catch (error) {
            this.logger.error('Error getting agents:', error);
            return [];
        }
    }
};
exports.AgentService = AgentService;
exports.AgentService = AgentService = AgentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AgentService);
//# sourceMappingURL=agent.service.js.map
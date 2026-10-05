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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubAgentController = void 0;
const common_1 = require("@nestjs/common");
const sub_agent_service_1 = require("./sub-agent.service");
let SubAgentController = class SubAgentController {
    constructor(subAgentService) {
        this.subAgentService = subAgentService;
    }
    async addSubAgent(body) {
        return this.subAgentService.addSubAgent(body);
    }
    async getAll() {
        return this.subAgentService.getAll();
    }
};
exports.SubAgentController = SubAgentController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubAgentController.prototype, "addSubAgent", null);
__decorate([
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubAgentController.prototype, "getAll", null);
exports.SubAgentController = SubAgentController = __decorate([
    (0, common_1.Controller)('sub_agent'),
    __metadata("design:paramtypes", [sub_agent_service_1.SubAgentService])
], SubAgentController);
//# sourceMappingURL=sub-agent.controller.js.map
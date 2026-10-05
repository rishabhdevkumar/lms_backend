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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageController = void 0;
const common_1 = require("@nestjs/common");
const language_service_1 = require("./language.service");
let LanguageController = class LanguageController {
    constructor(languageService) {
        this.languageService = languageService;
    }
    async getAll() {
        return this.languageService.getAll();
    }
    async getActive() {
        return this.languageService.getActive();
    }
};
exports.LanguageController = LanguageController;
__decorate([
    (0, common_1.Post)('getall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('get_active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LanguageController.prototype, "getActive", null);
exports.LanguageController = LanguageController = __decorate([
    (0, common_1.Controller)('language'),
    __metadata("design:paramtypes", [language_service_1.LanguageService])
], LanguageController);
//# sourceMappingURL=language.controller.js.map
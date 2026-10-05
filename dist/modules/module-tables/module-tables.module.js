"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTablesModule = void 0;
const common_1 = require("@nestjs/common");
const module_tables_controller_1 = require("./module-tables.controller");
const module_tables_service_1 = require("./module-tables.service");
let ModuleTablesModule = class ModuleTablesModule {
};
exports.ModuleTablesModule = ModuleTablesModule;
exports.ModuleTablesModule = ModuleTablesModule = __decorate([
    (0, common_1.Module)({
        controllers: [module_tables_controller_1.ModuleTablesController],
        providers: [module_tables_service_1.ModuleTablesService],
        exports: [module_tables_service_1.ModuleTablesService],
    })
], ModuleTablesModule);
//# sourceMappingURL=module-tables.module.js.map
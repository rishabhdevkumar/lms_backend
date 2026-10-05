"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyDepModule = void 0;
const common_1 = require("@nestjs/common");
const faculty_dep_controller_1 = require("./faculty-dep.controller");
const faculty_dep_service_1 = require("./faculty-dep.service");
let FacultyDepModule = class FacultyDepModule {
};
exports.FacultyDepModule = FacultyDepModule;
exports.FacultyDepModule = FacultyDepModule = __decorate([
    (0, common_1.Module)({
        controllers: [faculty_dep_controller_1.FacultyDepController],
        providers: [faculty_dep_service_1.FacultyDepService],
        exports: [faculty_dep_service_1.FacultyDepService],
    })
], FacultyDepModule);
//# sourceMappingURL=faculty-dep.module.js.map
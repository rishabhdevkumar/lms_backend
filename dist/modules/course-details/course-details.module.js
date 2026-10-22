"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const course_details_controller_1 = require("./course-details.controller");
const course_details_service_1 = require("./course-details.service");
let CourseDetailsModule = class CourseDetailsModule {
};
exports.CourseDetailsModule = CourseDetailsModule;
exports.CourseDetailsModule = CourseDetailsModule = __decorate([
    (0, common_1.Module)({
        controllers: [course_details_controller_1.CourseDetailsController],
        providers: [course_details_service_1.CourseDetailsService],
        exports: [course_details_service_1.CourseDetailsService],
    })
], CourseDetailsModule);
//# sourceMappingURL=course-details.module.js.map
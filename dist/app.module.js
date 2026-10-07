"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const users_module_1 = require("./modules/users/users.module");
const agent_module_1 = require("./modules/agent/agent.module");
const sub_agent_module_1 = require("./modules/sub-agent/sub-agent.module");
const block_module_1 = require("./modules/block/block.module");
const category_module_1 = require("./modules/category/category.module");
const sub_category_module_1 = require("./modules/sub-category/sub-category.module");
const chapter_module_1 = require("./modules/chapter/chapter.module");
const city_module_1 = require("./modules/city/city.module");
const country_module_1 = require("./modules/country/country.module");
const state_module_1 = require("./modules/state/state.module");
const destrict_module_1 = require("./modules/destrict/destrict.module");
const course_module_1 = require("./modules/course/course.module");
const faculty_dep_module_1 = require("./modules/faculty-dep/faculty-dep.module");
const language_module_1 = require("./modules/language/language.module");
const module_module_1 = require("./modules/module/module.module");
const module_tables_module_1 = require("./modules/module-tables/module-tables.module");
const room_module_1 = require("./modules/room/room.module");
const semester_module_1 = require("./modules/semester/semester.module");
const session_module_1 = require("./modules/session/session.module");
const subject_module_1 = require("./modules/subject/subject.module");
const syllabus_module_1 = require("./modules/syllabus/syllabus.module");
const timetable_module_1 = require("./modules/timetable/timetable.module");
const university_module_1 = require("./modules/university/university.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            agent_module_1.AgentModule,
            sub_agent_module_1.SubAgentModule,
            block_module_1.BlockModule,
            category_module_1.CategoryModule,
            sub_category_module_1.SubCategoryModule,
            chapter_module_1.ChapterModule,
            city_module_1.CityModule,
            country_module_1.CountryModule,
            state_module_1.StateModule,
            destrict_module_1.DestrictModule,
            course_module_1.CourseModule,
            faculty_dep_module_1.FacultyDepModule,
            language_module_1.LanguageModule,
            module_module_1.ModuleEntityModule,
            module_tables_module_1.ModuleTablesModule,
            room_module_1.RoomModule,
            semester_module_1.SemesterModule,
            session_module_1.SessionModule,
            subject_module_1.SubjectModule,
            syllabus_module_1.SyllabusModule,
            timetable_module_1.TimetableModule,
            university_module_1.UniversityModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
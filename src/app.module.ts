import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AgentModule } from './modules/agent/agent.module';
import { SubAgentModule } from './modules/sub-agent/sub-agent.module';
import { BlockModule } from './modules/block/block.module';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { CityModule } from './modules/city/city.module';
import { CountryModule } from './modules/country/country.module';
import { StateModule } from './modules/state/state.module';
import { DestrictModule } from './modules/destrict/destrict.module';
import { CourseModule } from './modules/course/course.module';
import { FacultyDepModule } from './modules/faculty-dep/faculty-dep.module';
import { LanguageModule } from './modules/language/language.module';
import { ModuleEntityModule } from './modules/module/module.module';
import { ModuleTablesModule } from './modules/module-tables/module-tables.module';
import { RoomModule } from './modules/room/room.module';
import { SemesterModule } from './modules/semester/semester.module';
import { SessionModule } from './modules/session/session.module';
import { SubjectModule } from './modules/subject/subject.module';
import { SyllabusModule } from './modules/syllabus/syllabus.module';
import { TimetableModule } from './modules/timetable/timetable.module';
import { UniversityModule } from './modules/university/university.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AgentModule,
    SubAgentModule,
    BlockModule,
    CategoryModule,
    SubCategoryModule,
    ChapterModule,
    CityModule,
    CountryModule,
    StateModule,
    DestrictModule,
    CourseModule,
    FacultyDepModule,
    LanguageModule,
    ModuleEntityModule,
    ModuleTablesModule,
    RoomModule,
    SemesterModule,
    SessionModule,
    SubjectModule,
    SyllabusModule,
    TimetableModule,
    UniversityModule,
  ],
})
export class AppModule {}

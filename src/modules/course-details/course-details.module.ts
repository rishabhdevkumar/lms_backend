import { Module } from '@nestjs/common';
import { CourseDetailsController } from './course-details.controller';
import { CourseDetailsService } from './course-details.service';

@Module({
  controllers: [CourseDetailsController],
  providers: [CourseDetailsService],
  exports: [CourseDetailsService],
})
export class CourseDetailsModule {}

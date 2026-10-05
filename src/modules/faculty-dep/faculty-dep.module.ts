import { Module } from '@nestjs/common';
import { FacultyDepController } from './faculty-dep.controller';
import { FacultyDepService } from './faculty-dep.service';

@Module({
  controllers: [FacultyDepController],
  providers: [FacultyDepService],
  exports: [FacultyDepService],
})
export class FacultyDepModule {}

import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './models/grade.model';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  providers: [GradesService],
  controllers: [GradesController],
  exports: [GradesService],
})
export class GradesModule {}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Request,
} from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradeUpdateDto } from './models/grade.update.dto';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradeService: GradesService) {}

  @Get('my/:locationId')
  getMyGrade(
    @Param('locationId', ParseIntPipe) locationId: number,
    @Request() req,
  ) {
    return this.gradeService.getUserGrade(locationId, req.user.id);
  }

  @Put()
  gradeLocation(@Body() dto: GradeUpdateDto, @Request() req) {
    return this.gradeService.gradeLocation(dto, req.user);
  }
}

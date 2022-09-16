import { PartialType } from '@nestjs/mapped-types';
import { GradeCreateDto } from './grade.create.dto';

export class GradeUpdateDto extends PartialType(GradeCreateDto) {}

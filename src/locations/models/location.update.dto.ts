import { PartialType } from '@nestjs/mapped-types';
import { LocationCreateDto } from './location.create.dto';

export class LocationUpdateDto extends PartialType(LocationCreateDto) {}

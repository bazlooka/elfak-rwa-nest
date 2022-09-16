import { PartialType } from '@nestjs/mapped-types';
import { LocationTypeCreateDto } from './location-type.create.dto';

export class LocationTypeUpdateDto extends PartialType(LocationTypeCreateDto) {}

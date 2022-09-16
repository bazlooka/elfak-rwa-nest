import { PartialType } from '@nestjs/mapped-types';
import { EventTypeCreateDto } from './event-type.create.dto';

export class EventTypeUpdateDto extends PartialType(EventTypeCreateDto) {}

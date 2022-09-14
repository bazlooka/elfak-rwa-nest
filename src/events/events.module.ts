import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventType } from './models/event-type.model';
import { Event } from './models/event.model';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventType])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

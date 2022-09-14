import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { Grade } from './models/grade.model';
import { LocationType } from './models/location-type.model';
import { Location } from './models/location.model';

@Module({
  imports: [TypeOrmModule.forFeature([Location, LocationType, Grade])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}

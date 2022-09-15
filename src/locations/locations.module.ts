import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { LocationType } from './models/location-type.model';
import { Location } from './models/location.model';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location, LocationType]), GradesModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}

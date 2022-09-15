import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationType } from './models/location-type.model';
import { Location } from './models/location.model';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(LocationType)
    private readonly locationTypeRepository: Repository<LocationType>,
  ) {}
}

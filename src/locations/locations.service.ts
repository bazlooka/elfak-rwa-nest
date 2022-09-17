import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/models/user.model';
import { LocationType } from './models/location-type.model';
import { LocationCreateDto } from './models/location.create.dto';
import { Location } from './models/location.model';
import { LocationUpdateDto } from './models/location.update.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(LocationType)
    private readonly locationTypeRepository: Repository<LocationType>,
  ) {}

  public getAll() {
    return this.locationRepository.find();
  }

  public async create(
    jsonDto: string,
    images: Array<Express.Multer.File>,
    user: User,
  ) {
    const dto = (await JSON.parse(jsonDto)) as LocationCreateDto;

    const location = this.locationRepository.create(dto);
    location.imagePaths = images.map((image) => {
      return image.path;
    });
    location.author = user;

    return await this.locationRepository.save(location);
  }

  public async delete(id: number) {
    return await this.locationRepository.delete(id);
  }

  public async update(id: number, dto: LocationUpdateDto) {
    return await this.locationRepository.update(id, dto);
  }
}

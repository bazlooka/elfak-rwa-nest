import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/models/user.model';
import { HomepageDto } from './models/homepage.dto';
import { LocationPin } from './models/location-pin.dto';
import { LocationTypeCreateDto } from './models/location-type.create.dto';
import { LocationType } from './models/location-type.model';
import { LocationCreateDto } from './models/location.create.dto';
import { Location } from './models/location.model';
import { LocationUpdateDto } from './models/location.update.dto';
import { TrendingLocationDto } from './models/trending-location.dto';

//todo move
const MAP_SETTINGS = {
  center: [43.3207, 21.8964],
  zoom: 14,
};

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(LocationType)
    private readonly locationTypeRepository: Repository<LocationType>,
  ) {}

  public async getHomepage(): Promise<HomepageDto> {
    return {
      map: MAP_SETTINGS,
      locationPins: await this.getLocationPins(),
      trendingLocations: await this.getTrending(),
    };
  }

  private async getLocationPins(): Promise<LocationPin[]> {
    const locations = await this.locationRepository.find({
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
      },
      relations: {
        type: true,
      },
    });

    return locations.map((location) => {
      return {
        id: location.id,
        position: [location.latitude, location.longitude],
        name: location.name,
        markerPath: location.type.markerPath,
        typeName: location.type.name,
      };
    });
  }

  public getAll() {
    return this.locationRepository.find();
  }

  private async getTrending(): Promise<TrendingLocationDto[]> {
    return await this.locationRepository
      .createQueryBuilder('location')
      .leftJoin('location.type', 'type')
      .leftJoin('location.grades', 'grades')
      .select('location.id', 'id')
      .addSelect('location.name', 'name')
      .addSelect('location.description', 'description')
      .addSelect("SPLIT_PART(location.imagePaths, ',', 1)", 'imagePath')
      .addSelect('location.publicationTime', 'publicationTime')
      .addSelect('COUNT(DISTINCT(grades.id))', 'gradecount')
      .addSelect('ROUND(COALESCE(AVG(grades.rating), 0), 1)', 'averageGrade')
      .addSelect('type.name', 'typeName')
      .orderBy('gradecount', 'DESC')
      .addGroupBy('location.id')
      .addGroupBy('type.id')
      .limit(10)
      .getRawMany<TrendingLocationDto>();
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

  public async createLocationType(dto: LocationTypeCreateDto) {
    const locationType = this.locationTypeRepository.create(dto);
    return await this.locationTypeRepository.save(locationType);
  }
}

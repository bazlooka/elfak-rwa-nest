import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingKey } from '../settings/settings.keys';
import { SettingsService } from '../settings/settings.service';
import { User } from '../users/models/user.model';
import { AdminLocationTypeDto } from './models/admin-location-type.dto';
import { HomepageDto } from './models/homepage.dto';
import { LocationPin } from './models/location-pin.dto';
import { LocationTypeCreateDto } from './models/location-type.create.dto';
import { LocationType } from './models/location-type.model';
import { LocationTypeUpdateDto } from './models/location-type.update.dto';
import { LocationCreateDto } from './models/location.create.dto';
import { Location } from './models/location.model';
import { LocationUpdateDto } from './models/location.update.dto';
import { TrendingLocationDto } from './models/trending-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(LocationType)
    private readonly locationTypeRepository: Repository<LocationType>,
    private readonly settingsService: SettingsService,
  ) {}

  public async getHomepage(): Promise<HomepageDto> {
    const mapLatitude = Number(
      await this.settingsService.getValue(SettingKey.MAP_CENTER_LAT),
    );
    const mapLongitude = Number(
      await this.settingsService.getValue(SettingKey.MAP_CENTER_LNG),
    );
    const mapZoom = Number(
      await this.settingsService.getValue(SettingKey.MAP_ZOMM),
    );

    const locationPins = await this.getLocationPins();
    const trendingLocations = await this.getTrending();

    return {
      map: {
        center: [mapLatitude, mapLongitude],
        zoom: mapZoom,
      },
      locationPins,
      trendingLocations,
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
    dto: LocationCreateDto,
    images: Array<Express.Multer.File>,
    user: User,
  ) {
    const location = this.locationRepository.create(dto);

    location.type = await this.locationTypeRepository.findOneBy({
      id: dto.typeId,
    });

    console.log('IMAGES', images);
    console.log('DTO', dto);

    if (images) {
      location.imagePaths = images.map((image) => {
        return '/' + image.filename;
      });
    }

    location.author = user;

    return await this.locationRepository.save(location);
  }

  public async delete(id: number) {
    return await this.locationRepository.delete(id);
  }

  public async update(id: number, dto: LocationUpdateDto) {
    return await this.locationRepository.update(id, dto);
  }

  public async getAllLocationTypes() {
    return this.locationTypeRepository
      .createQueryBuilder('location_type')
      .leftJoin('location_type.locations', 'locations')
      .select('location_type.id', 'id')
      .addSelect('location_type.name', 'name')
      .addSelect('location_type.markerPath', 'markerPath')
      .addSelect('COUNT(DISTINCT(locations.id))', 'locationCount')
      .groupBy('location_type.id')
      .getRawMany();
  }

  public async createLocationType(
    dto: LocationTypeCreateDto,
    image: Express.Multer.File,
  ): Promise<AdminLocationTypeDto> {
    const locationType = this.locationTypeRepository.create(dto);
    locationType.markerPath = '/' + image.filename;

    const savedLocationType = await this.locationTypeRepository.save(
      locationType,
    );

    return { ...savedLocationType, locationCount: 0 };
  }

  public async updateLocationType(
    id: number,
    dto: LocationTypeUpdateDto,
    image: Express.Multer.File,
  ): Promise<LocationType> {
    const locationType = await this.locationTypeRepository.findOneBy({ id });

    if (image) {
      locationType.markerPath = '/' + image.filename;
    }

    return this.locationTypeRepository.save({
      ...locationType,
      ...dto,
    });
  }
}

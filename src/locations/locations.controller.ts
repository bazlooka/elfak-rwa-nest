import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Request,
  Get,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../multer.config';
import { Public } from '../auth/decorators/public-endpoint.decorator';
import { LocationsService } from './locations.service';
import { LocationTypeCreateDto } from './models/location-type.create.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Public()
  @Get('homepage')
  getHomepage() {
    return this.locationsService.getHomepage();
  }

  @Public()
  @Get()
  getAllLocations() {
    return this.locationsService.getAll();
  }

  // @Public()
  // @Get()
  // getTrendingLocations() {
  //   return this.locationsService.getTrending();
  // }

  @Post()
  //@Roles(Role.Editor)
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  createLocation(
    @UploadedFiles()
    images: Array<Express.Multer.File>,
    @Body() body,
    @Request() request,
  ) {
    return this.locationsService.create(body.dto, images, request.user);
  }

  @Public()
  @Post('types')
  createLocationType(@Body() dto: LocationTypeCreateDto) {
    return this.locationsService.createLocationType(dto);
  }
}

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

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Public()
  @Get()
  getAllLocations() {
    return this.locationsService.getAll();
  }

  @Post()
  //@Roles(Role.Editor)
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  createLocation(
    @UploadedFiles()
    images: Array<Express.Multer.File>,
    @Body() body,
    @Request() request,
  ) {
    this.locationsService.create(body.dto, images, request.user);
  }
}

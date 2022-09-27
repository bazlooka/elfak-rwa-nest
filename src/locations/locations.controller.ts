import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Request,
  Get,
  UploadedFile,
  Put,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../multer.config';
import { Public } from '../auth/decorators/public-endpoint.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { LocationsService } from './locations.service';
import { LocationTypeCreateDto } from './models/location-type.create.dto';
import { LocationTypeUpdateDto } from './models/location-type.update.dto';
import { LocationCreateDto } from './models/location.create.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Public()
  @Get('homepage')
  getHomepage(@Query('userId') userId?: number) {
    return this.locationsService.getHomepage(userId);
  }

  @Get('types')
  @Roles(Role.Editor)
  getAllLocationTypes() {
    return this.locationsService.getAllLocationTypes();
  }

  @Post('types')
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  createLocationType(
    @Body() dto: LocationTypeCreateDto,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    return this.locationsService.createLocationType(dto, image);
  }

  @Put('types/:id')
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  editeLocationType(
    @Body() dto: LocationTypeUpdateDto,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile()
    image?: Express.Multer.File,
  ) {
    return this.locationsService.updateLocationType(id, dto, image);
  }

  @Public()
  @Get()
  getAllLocations() {
    return this.locationsService.getAll();
  }

  @Public()
  @Get(':id')
  getLocation(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.get(id);
  }

  @Post()
  @Roles(Role.Editor)
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  createLocation(
    @UploadedFiles()
    images: Array<Express.Multer.File>,
    @Body() dto: LocationCreateDto,
    @Request() request,
  ) {
    return this.locationsService.create(dto, images, request.user);
  }
}

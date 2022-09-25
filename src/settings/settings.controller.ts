import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Put,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { SettingDto } from './model/setting.dto';
import { SettingKey } from './settings.keys';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles(Role.Admin)
  getAllSettings() {
    return this.settingsService.getAll();
  }

  @Put(':key')
  @Roles(Role.Admin)
  putSetting(
    @Param('key', new ParseEnumPipe(SettingKey)) key: SettingKey,
    @Body() dto: SettingDto,
  ) {
    return this.settingsService.put(key, dto);
  }
}

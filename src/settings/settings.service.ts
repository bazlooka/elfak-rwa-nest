import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingDto } from './model/setting.dto';
import { Setting } from './model/setting.model';
import { SettingKey } from './settings.keys';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingsRepository: Repository<Setting>,
  ) {}

  public async get(key: SettingKey) {
    return await this.settingsRepository.findOneBy({ key });
  }

  public async getValue(key: SettingKey) {
    return (await this.get(key)).value;
  }

  public async getAll() {
    return await this.settingsRepository.find();
  }

  public async put(key: SettingKey, dto: SettingDto) {
    return await this.settingsRepository.save({
      key,
      value: dto.value,
    });
  }
}

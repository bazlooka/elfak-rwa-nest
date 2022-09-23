import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './models/user.create.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: UserCreateDto): Promise<User> {
    if (
      (await this.userRepository.findOneBy({
        username: createUserDto.username,
      })) !== null
    ) {
      throw new HttpException(
        'Username is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    user.roles = [Role.Viewer];

    const userInDb = await this.userRepository.save(user);
    return {
      ...userInDb,
      parseRoles: undefined,
      password: undefined,
      deletedDate: undefined,
    };
  }

  async getByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async getById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}

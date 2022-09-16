import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './enums/role.enum';
import { UserCreateDto } from './models/user.create.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: UserCreateDto): Promise<User> {
    // if (
    //   this.userRepository.findOneBy({ username: createUserDto.username }) !==
    //   null
    // ) {
    //   throw new Error('Username is already taken');
    // }
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    //return this.users.find((user) => user.username === username);
    return undefined;
  }

  async findById(userId: number): Promise<User | undefined> {
    //return this.users.find((user) => user.id === userId);
    return undefined;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './models/user.create.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { Role } from './enums/role.enum';
import { UserUpdateDto } from './models/user.update.dto';
import { AdminUserDto } from './models/admin-user-dto';

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

  async search(query = ''): Promise<AdminUserDto[]> {
    const formattedQuery = `%${query.split(' ').join('|')}%`;

    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.grades', 'grades')
      .leftJoin('user.publishedLocations', 'locations')
      .where(
        'lower(user.firstName) similar to :q or lower(user.lastName)' +
          'similar to :q or lower(user.username) similar to :q',
        {
          q: formattedQuery,
        },
      )
      .select('user.id', 'id')
      .addSelect('user.firstName', 'firstName')
      .addSelect('user.lastName', 'lastName')
      .addSelect('user.username', 'username')
      .addSelect('user.roles', 'roles')
      .addSelect('user.isBanned', 'isBanned')
      .addSelect('COUNT(DISTINCT(locations.id))', 'locationCount')
      .addSelect('COUNT(DISTINCT(grades.id))', 'gradeCount')
      .groupBy('user.id')
      .getRawMany();

    return users.map((user) => {
      return { ...user, roles: user.roles.split(',') };
    });
  }

  async updateUser(userId: number, dto: UserUpdateDto) {
    await this.userRepository.update(userId, dto);
    return { ...dto, id: userId };
  }

  async delete(userId: number) {
    return this.userRepository.softDelete(userId);
  }
}

import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  // private readonly users: User[] = [
  //   {
  //     id: 1,
  //     username: 'john',
  //     password: 'changeme',
  //     roles: [Role.Viewer],
  //   },
  //   {
  //     id: 2,
  //     username: 'maria',
  //     password: 'guess',
  //     roles: [Role.Viewer],
  //   },
  // ];

  async findOne(username: string): Promise<User | undefined> {
    //return this.users.find((user) => user.username === username);
    return undefined;
  }

  async findById(userId: number): Promise<User | undefined> {
    //return this.users.find((user) => user.id === userId);
    return undefined;
  }
}

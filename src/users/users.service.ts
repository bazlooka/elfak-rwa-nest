import { Injectable } from '@nestjs/common';
import { Role } from './enums/role.enum';

import { IUser } from './models/user.interface';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      roles: [Role.Viewer],
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      roles: [Role.Viewer],
    },
  ];

  async findOne(username: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(userId: number): Promise<IUser | undefined> {
    return this.users.find((user) => user.id === userId);
  }
}

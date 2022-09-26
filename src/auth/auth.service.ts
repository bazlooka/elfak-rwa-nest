import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from '../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getByUsername(username);
    if (!user || !(await compare(pass, user.password)) || user.isBanned) {
      return null;
    }

    return { ...user, password: undefined };
  }

  async login(user: User) {
    const jwtPayload = { username: user.username, sub: user.id };

    return {
      ...user,
      accessToken: this.jwtService.sign(jwtPayload),
    };
  }
}

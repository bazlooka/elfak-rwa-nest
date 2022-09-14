import { Role } from '../enums/role.enum';

export type IUser = {
  id: number;
  username: string;
  password: string;
  roles: Role[];
};

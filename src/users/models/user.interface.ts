import { Role } from '../../auth/enums/role.enum';

export type User = {
  id: number;
  username: string;
  password: string;
  roles: Role[];
};

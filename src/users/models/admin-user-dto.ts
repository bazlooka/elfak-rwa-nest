import { Role } from '../enums/role.enum';

export interface AdminUserDto {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  isBanned: boolean;
  locationCount: number;
  gradeCount: number;
}

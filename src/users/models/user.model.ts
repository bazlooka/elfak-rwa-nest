import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { IUser } from './user.interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array')
  roles: Role[];
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Grade } from '../../locations/grades/models/grade.model';
import { Role } from '../enums/role.enum';
import { Event } from '../../events/models/event.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  username: string;

  @Column('varchar', { length: 32 })
  firstName: string;

  @Column('varchar', { length: 32 })
  lastName: string;

  @Column('varchar', { length: 256 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { default: [Role.Viewer] })
  roles: Role[];

  @OneToMany(() => Grade, (grade) => grade.gradedBy)
  grades: Grade;

  @ManyToMany(() => Event, (event) => event.likedBy)
  likedEvents: Event;
}

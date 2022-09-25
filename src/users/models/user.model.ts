import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Grade } from '../../locations/grades/models/grade.model';
import { Role } from '../enums/role.enum';
import { Location } from '../../locations/models/location.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32, unique: true })
  username: string;

  @Column('varchar', { length: 32 })
  firstName: string;

  @Column('varchar', { length: 32 })
  lastName: string;

  @Column('varchar', { length: 256 })
  password: string;

  @Column('simple-array', { default: [Role.Viewer] })
  roles: Role[];

  @Column('boolean', { default: false })
  isBanned: boolean;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Grade, (grade) => grade.gradedBy)
  grades: Grade[];

  @OneToMany(() => Location, (location) => location.author)
  publishedLocations: Location[];

  @BeforeInsert()
  @BeforeUpdate()
  async parseRoles() {
    this.roles = this.roles.map((role) => role.toString()) as Role[];
  }
}

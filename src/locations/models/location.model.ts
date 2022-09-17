import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/models/user.model';
import { Grade } from '../grades/models/grade.model';
import { LocationType } from './location-type.model';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  name: string;

  @Column('varchar', { length: 512 })
  descrpition: string;

  @Column('simple-array')
  imagePaths: string[];

  @CreateDateColumn()
  publicationTime: Date;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => LocationType, (locationType) => locationType.locations)
  type: LocationType;

  @OneToMany(() => Grade, (grade) => grade.location)
  grades: Grade[];

  @ManyToOne(() => User, (user) => user.publishedLocations)
  author: User;
}

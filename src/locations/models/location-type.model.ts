import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from './location.model';

@Entity()
export class LocationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  name: string;

  @Column('varchar', { length: 128 })
  markerPath: string;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Location, (location) => location.type)
  locations: Location[];
}

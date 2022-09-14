import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.model';

@Entity()
export class LocationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  name: string;

  @Column('varchar', { length: 128 })
  markerPath: string;

  @ManyToOne(() => Location, (location) => location.type)
  locations: Location[];
}

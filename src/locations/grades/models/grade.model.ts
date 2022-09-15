import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../users/models/user.model';
import { Location } from '../../models/location.model';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  rating: number;

  @Column('varchar', { length: 256 })
  comment: string;

  @ManyToOne(() => Location, (location) => location.grades)
  location: Location;

  @ManyToOne(() => User, (user) => user.grades)
  gradedBy: User;
}

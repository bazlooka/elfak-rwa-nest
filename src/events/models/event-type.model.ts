import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.model';

@Entity()
export class EventType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  name: string;

  @Column('varchar', { length: 16 })
  color: string;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Event, (event) => event.type)
  events: Event[];
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/models/user.model';
import { EventType } from './event-type.model';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  name: string;

  @Column('varchar', { length: 512 })
  description: string;

  @Column('timestamp')
  startingDate: Date;

  @Column('timestamp')
  endingDate: Date;

  @CreateDateColumn()
  publicationDate: Date;

  @Column('varchar', { length: 128 })
  imagePath: string;

  @ManyToOne(() => EventType, (eventType) => eventType.events)
  type: EventType;

  @ManyToMany(() => User, (user) => user.likedEvents)
  likedBy: User[];
}

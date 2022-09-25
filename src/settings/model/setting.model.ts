import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Setting {
  @PrimaryColumn('varchar', { length: 64 })
  key: string;

  @Column('varchar', { length: 128 })
  value: string;

  @Column('varchar', { length: 128 })
  name: string;
}

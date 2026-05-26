import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('conversions')
export class Conversion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  amount: number;

  @Column({
    length: 3,
  })
  fromCurrency: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  usdValue: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  eurValue: number;

  @CreateDateColumn()
  createdAt: Date;
}
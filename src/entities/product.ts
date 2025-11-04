import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { State } from './enums/states.enum';

@Entity('product', { schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('text', { unique: true, nullable: false })
  sku: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('numeric', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column('int', { nullable: false })
  stock: number;

  @Column('text', { nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: State,
    nullable: false,
    default: State.ACTIVE,
  })
  status: State;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

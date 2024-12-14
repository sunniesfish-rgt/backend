import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './books.entity';

@Entity('book_metadata')
export class BookMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: false })
  author: string;

  @Column({ type: 'int', default: 0 })
  stockQuantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Book, (book) => book.metadata)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}

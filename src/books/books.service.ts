import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './entities/books.entity';
import { DataSource, Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookMetadata } from './entities/book-metadata.entity';
import { PaginatedResponse } from 'src/common/dtos/pagenation.dto';
import { SearchBookDto } from './dtos/search-book.dto';
import { calculatePaginationMeta } from 'src/common/utils/pagenation.util';
import {
  BookNotFoundException,
  BookOperationException,
} from './book.exceptions';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(BookMetadata)
    private readonly bookMetadataRepository: Repository<BookMetadata>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(
    searchDto: SearchBookDto,
  ): Promise<PaginatedResponse<BookMetadata>> {
    try {
      const { page, limit, order, title, author } = searchDto;
      const query =
        this.bookMetadataRepository.createQueryBuilder('book_metadata');
      if (title) {
        query.andWhere('book_metadata.title LIKE :title', { title });
      }
      if (author) {
        query.andWhere('book_metadata.author LIKE :author', { author });
      }
      query.orderBy('book_metadata.createdAt', order);
      const skip = (page - 1) * limit;
      const [data, total] = await query
        .skip(skip)
        .take(limit)
        .getManyAndCount();
      const meta = calculatePaginationMeta(total, page, limit);
      return { data, meta };
    } catch (error) {
      throw new BookOperationException('조회', error.message);
    }
  }

  async findOne(id: string): Promise<Book | undefined> {
    try {
      const book = await this.booksRepository.findOne({
        where: { id },
        relations: ['metadata'],
      });
      if (!book) {
        throw new BookNotFoundException(id);
      }
      return book;
    } catch (error) {
      throw new BookOperationException('조회', error.message);
    }
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      return this.dataSource.transaction(async (manager) => {
        const book = manager.create(Book, createBookDto);
        const bookMetadata = manager.create(BookMetadata, {
          ...createBookDto.metadata,
          title: book.title,
          author: book.author,
          book: book,
        });
        book.metadata = bookMetadata;
        return manager.save(book);
      });
    } catch (error) {
      throw new BookOperationException('생성', error.message);
    }
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    try {
      return this.dataSource.transaction(async (manager) => {
        const book = await manager.findOne(Book, { where: { id } });
        if (!book) {
          throw new BookNotFoundException(id);
        }
        if (!updateBookDto.bookdata && !updateBookDto.metadata) {
          throw new BookOperationException(
            '업데이트',
            '업데이트할 데이터가 없습니다',
          );
        }
        if (!updateBookDto.bookdata) {
          return manager.update(BookMetadata, id, {
            ...updateBookDto.metadata,
            title: updateBookDto.title,
            author: updateBookDto.author,
          });
        }
        if (!updateBookDto.metadata) {
          return manager.update(Book, id, {
            ...updateBookDto.bookdata,
            title: updateBookDto.title,
            author: updateBookDto.author,
          });
        }
        return manager.update(Book, id, {
          title: updateBookDto.title,
          author: updateBookDto.author,
        });
      });
    } catch (error) {
      throw new BookOperationException('업데이트', error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return this.booksRepository.delete(id);
    } catch (error) {
      throw new BookOperationException('삭제', error.message);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { SearchBookDto } from './dtos/search-book.dto';
import { BookMetadata } from './entities/book-metadata.entity';
import { PaginatedResponse } from 'src/common/dtos/pagenation.dto';
import { Book } from './entities/books.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  async getAllBooks(
    @Query() searchDto: SearchBookDto,
  ): Promise<PaginatedResponse<BookMetadata>> {
    return this.booksService.findAll(searchDto);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<boolean> {
    const result = await this.booksService.update(id, updateBookDto);
    return result.affected > 0;
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<boolean> {
    const result = await this.booksService.remove(id);
    return result.affected > 0;
  }
}

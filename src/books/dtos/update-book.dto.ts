import { IsNotEmpty, IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  author?: string;
  @IsOptional()
  @IsObject()
  bookdata?: {
    publishedDate?: Date;
    coverImage?: string;
    coverImageThumbnail?: string;
    description?: string;
  };
  @IsOptional()
  @IsObject()
  metadata?: {
    price?: number;
    stockQuantity?: number;
  };
}

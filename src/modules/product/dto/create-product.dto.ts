import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNotEmpty()
  @Min(0, { message: 'El precio no puede ser negativo.' })
  price: number;

  @Type(() => Number)
  @IsNotEmpty()
  @Min(0, { message: 'El stock no puede ser negativo.' })
  stock: number;

  @IsString()
  @IsOptional()
  description?: string;
}

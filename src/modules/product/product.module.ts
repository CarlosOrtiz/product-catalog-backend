import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product';
import { ProductController } from './product.controller';
import { StockProductService } from './services/stock.service';
import { ReindexProductService } from './services/reindex.service';
import { GetProductsService } from './services/get-products.service';
import { CreateProductService } from './services/create-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product], 'catalogDb'),
  ],
  controllers: [ProductController],
  providers: [
    GetProductsService,
    CreateProductService,
    StockProductService,
    ReindexProductService
  ]
})
export class ProductModule { }

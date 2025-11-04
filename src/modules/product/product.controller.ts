import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { FilterDto } from '../../@common/dto/filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiKeyGuard } from '../../@common/guard/api-key.guard';
import { StockProductService } from './services/stock.service';
import { ReindexProductService } from './services/reindex.service';
import { BasicResponse } from '../../@common/response/basic-response';
import { GetProductsService } from './services/get-products.service';
import { CreateProductService } from './services/create-product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getProducts: GetProductsService,
    private readonly createProduct: CreateProductService,
    private readonly stockProduct: StockProductService,
    private readonly reindexProduct: ReindexProductService,

  ) { }

  @Get()
  async all(@Query() filters: FilterDto): Promise<BasicResponse> {
    filters.page = filters?.page || 1;
    filters.limit = filters?.limit || 10;
    const products = await this.getProducts.all(filters);
    return { success: true, detail: products };
  }

  @Post('')
  @UseGuards(ApiKeyGuard)
  async create(@Body() body: CreateProductDto): Promise<BasicResponse> {
    const response = await this.createProduct.create(body);
    return { success: true, detail: response }
  }

  @Patch('/:id/stock')
  @UseGuards(ApiKeyGuard)
  async stock(
    @Param('id') id: string,
    @Body() body: UpdateStockDto
  ): Promise<BasicResponse> {
    //if (headers['x-api-key'] === process.env.API_PASSWORD) 
    return await this.stockProduct.set(id, body);
  }

  @Post('/:id/reindex')
  @HttpCode(202)
  async reindex(@Param('id') id: string): Promise<BasicResponse> {
    return await this.reindexProduct.set(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../entities/product';
import { BasicResponse } from '../../../@common/response/basic-response';

@Injectable()
export class ReindexProductService {
  constructor(
    @InjectRepository(Product, 'catalogDb')
    private readonly productRepository: Repository<Product>,
  ) { }

  async set(productId: string): Promise<BasicResponse> {
    const isProduct = await this.productRepository.findOne({ where: { id: +productId } })
    if (!isProduct)
      throw new NotFoundException({
        success: false,
        detail: 'PRODUCT_NOT_FOUND',
        message: 'El producto no esta registrado'
      })

    const delay = 3000;

    setTimeout(() => {
      console.log(`reindex product ${productId}`, {
        id: isProduct.id,
        sku: isProduct.sku,
        name: isProduct.name,
      });
    }, delay)

    return {
      success: true,
      message: 'reindex realizada'
    };
  };
}
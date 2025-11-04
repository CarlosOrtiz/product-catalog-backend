import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../entities/product';
import { State } from '../../../entities/enums/states.enum';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductService {

  constructor(
    @InjectRepository(Product, 'catalogDb')
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(body: CreateProductDto): Promise<Product> {
    const isProduct = await this.productRepository.findOne({ where: { sku: body.sku } })
    if (isProduct)
      throw new BadRequestException({
        success: false,
        detail: 'SKU_FOUND',
        message: 'El SKU ya se encuentra registrado.'
      })

    try {
      const newProduct = await this.productRepository.save({
        sku: body.sku.trim(),
        name: body.name.trim(),
        ...body,
        status: body.stock > 0 ? State.ACTIVE : State.INACTIVE
      });

      return newProduct;
    } catch (error) {
      throw new BadRequestException({
        success: false,
        detail: 'ERROR_CREATE_PRODUCTS',
        error,
      })
    }
  }
}

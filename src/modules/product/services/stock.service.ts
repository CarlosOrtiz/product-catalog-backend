import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Product } from '../../../entities/product';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { BasicResponse } from '../../../@common/response/basic-response';

@Injectable()
export class StockProductService {
  private nodeEnv: string;

  constructor(
    @InjectRepository(Product, 'catalogDb')
    private readonly productRepository: Repository<Product>,
    private readonly configService: ConfigService,
  ) {
    this.nodeEnv = this.configService.get('NODE_ENV');
  }

  async set(productId: string, body: UpdateStockDto): Promise<BasicResponse> {
    const isProduct = await this.productRepository.findOne({ where: { id: +productId } })
    if (!isProduct)
      throw new NotFoundException({
        success: false,
        detail: 'PRODUCT_NOT_FOUND',
        message: 'El producto no esta registrado'
      })

    try {

      const isUpdate = await this.productRepository.update(isProduct.id, { stock: body.stock })
      if (isUpdate.affected > 0)
        return { success: true, detail: 'Stock actualizado con éxito.' }
    } catch (error) {
      console.log(error)
      throw new BadRequestException({
        success: false,
        detail: 'ERROR_CREATE_PRODUCTS',
        debug: ['staging', 'local'].includes(this.nodeEnv) ? error : undefined,
      })
    }
  }
}

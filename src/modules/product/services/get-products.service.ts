import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from '../../../@common/dto/filter.dto';
import { Pagination } from '../../../@common/response/pagination';
import { Product } from '../../../entities/product';
import { Repository } from 'typeorm';

@Injectable()
export class GetProductsService {
  constructor(
    @InjectRepository(Product, 'catalogDb')
    private readonly productRepository: Repository<Product>,
  ) { }

  async all(filters: FilterDto): Promise<Pagination> {
    const queryProducts = this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.sku',
        'product.price',
        'product.stock',
        'product.status',
      ])
      .orderBy('product.id', filters?.order === 'DESC' ? 'DESC' : 'ASC')
      .skip((filters.page - 1) * filters.limit)
      .take(filters.limit)

    if (filters?.name)
      queryProducts.andWhere('lower(product.name) like lower(:name)', { name: `%${filters.name}%` });

    if (filters?.sku)
      queryProducts.andWhere('lower(product.sku) like lower(:sku)', { name: `%${filters.sku}%` });

    const [products, total] = await queryProducts.getManyAndCount();

    const totalItems = total;
    const itemsPerPage = filters.limit;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = filters.page;

    return {
      items: products,
      meta: {
        totalItems,
        itemsPerPage,
        totalPages,
        currentPage
      }
    };
  }
}

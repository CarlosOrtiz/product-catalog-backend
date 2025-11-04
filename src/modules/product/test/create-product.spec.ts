import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../entities/product';
import { CreateProductService } from "../services/create-product.service"

describe('product', () => {
  let service: CreateProductService;
  let mockProductRepository: Partial<Record<keyof Repository<Product>, jest.Mock>>;

  beforeEach(async () => {
    mockProductRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductService,
        {
          provide: getRepositoryToken(Product, 'catalogDb'),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<CreateProductService>(CreateProductService);
  });

  it('should return a new product', async () => {
    const mockCreateProductDto = {
      id: 1,
      name: 'Taza Cerámica',
      sku: 'TAZ-001',
      price: 9.99,
      stock: 10,
      status: 'active'
    };

    mockProductRepository.findOne.mockResolvedValue(null);

    mockProductRepository.save.mockResolvedValue(mockCreateProductDto);

    const result = await service.create(mockCreateProductDto);

    expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { sku: mockCreateProductDto.sku } });
    expect(mockProductRepository.save).toHaveBeenCalled();
    expect(result.sku).toEqual(mockCreateProductDto.sku);
  });

  it('should throw BadRequestException if SKU already exists', async () => {
    const existingProduct = {
      id: 1,
      name: 'Taza Cerámica',
      sku: 'TAZ-0012kkkk',
      price: 9.99,
      stock: 50,
    };

    mockProductRepository.findOne.mockResolvedValue(existingProduct);

    await expect(service.create(existingProduct)).rejects.toThrow('El SKU ya se encuentra registrado.');
    expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { sku: existingProduct.sku } });
    expect(mockProductRepository.save).not.toHaveBeenCalled();
  });
});
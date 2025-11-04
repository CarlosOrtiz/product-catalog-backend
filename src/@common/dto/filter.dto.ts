import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional() @IsString() page?: number;
  @IsOptional() @IsString() limit?: number;

  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() sku?: string;
  @IsOptional() @IsString() state?: string;
  @IsOptional() @IsString() order?: string;
}

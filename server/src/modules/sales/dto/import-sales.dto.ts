import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SalesRecordDto {
  @IsString()
  @IsNotEmpty()
  storeCode: string;

  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsString()
  @IsOptional()
  categoryCode?: string;

  @IsDateString()
  saleDate: string;

  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  salesAmount?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  grossProfit?: number;
}

export class ImportSalesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesRecordDto)
  records: SalesRecordDto[];
}

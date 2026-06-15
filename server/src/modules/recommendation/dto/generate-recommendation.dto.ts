import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GenerateRecommendationDto {
  @IsString()
  @IsNotEmpty()
  storeCode: string;

  @IsString()
  @IsNotEmpty()
  productCode: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  safetyStock?: number;
}

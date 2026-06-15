import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class RunForecastDto {
  @IsString()
  @IsNotEmpty()
  storeCode: string;

  @IsString()
  @IsNotEmpty()
  productCode: string;

  @Type(() => Number)
  @IsIn([7, 30, 90])
  forecastDays: 7 | 30 | 90;
}

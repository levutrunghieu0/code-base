import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesForecast } from '../../entities/sales-forecast.entity';
import { SalesModule } from '../sales/sales.module';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesForecast]), SalesModule],
  controllers: [ForecastController],
  providers: [ForecastService],
  exports: [ForecastService],
})
export class ForecastModule {}

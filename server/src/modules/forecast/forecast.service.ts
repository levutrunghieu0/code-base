import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesForecast } from '../../entities/sales-forecast.entity';
import { SalesService } from '../sales/sales.service';
import { RunForecastDto } from './dto/run-forecast.dto';

@Injectable()
export class ForecastService {
  constructor(
    @InjectRepository(SalesForecast) private readonly forecastRepo: Repository<SalesForecast>,
    private readonly salesService: SalesService,
  ) {}

  async run(dto: RunForecastDto) {
    const recentSales = await this.salesService.getRecentSales(dto.storeCode, dto.productCode, 90);
    const quantities = recentSales.map((record) => Number(record.quantity));
    const average = quantities.length
      ? quantities.reduce((sum, value) => sum + value, 0) / quantities.length
      : 0;
    const lastActual = quantities[0] ?? average;
    const mape = lastActual ? Math.abs((lastActual - average) / lastActual) * 100 : 0;

    const today = new Date();
    const forecasts = Array.from({ length: dto.forecastDays }, (_, index) => {
      const forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + index + 1);
      return this.forecastRepo.create({
        storeCode: dto.storeCode,
        productCode: dto.productCode,
        forecastDate: forecastDate.toISOString().slice(0, 10),
        forecastQuantity: Number(average.toFixed(2)),
        modelName: 'moving_average_90',
        mape: Number(mape.toFixed(4)),
        mae: Number(Math.abs(lastActual - average).toFixed(4)),
        rmse: Number(Math.sqrt(Math.pow(lastActual - average, 2)).toFixed(4)),
      });
    });

    return this.forecastRepo.save(forecasts);
  }

  findResults(storeCode?: string, productCode?: string) {
    return this.forecastRepo.find({
      where: { storeCode, productCode },
      order: { forecastDate: 'ASC' },
      take: 500,
    });
  }

  async accuracy(storeCode?: string, productCode?: string) {
    const rows = await this.findResults(storeCode, productCode);
    const count = rows.length || 1;
    return {
      mape: rows.reduce((sum, row) => sum + Number(row.mape ?? 0), 0) / count,
      mae: rows.reduce((sum, row) => sum + Number(row.mae ?? 0), 0) / count,
      rmse: rows.reduce((sum, row) => sum + Number(row.rmse ?? 0), 0) / count,
      samples: rows.length,
    };
  }

  async totalForecastDemand(storeCode?: string) {
    const rows = await this.forecastRepo.find({ where: { storeCode } });
    return rows.reduce((sum, row) => sum + Number(row.forecastQuantity), 0);
  }
}

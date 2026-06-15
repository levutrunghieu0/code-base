import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesHistory } from '../../entities/sales-history.entity';
import { ForecastService } from '../forecast/forecast.service';
import { RecommendationService } from '../recommendation/recommendation.service';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(SalesHistory) private readonly salesRepo: Repository<SalesHistory>,
    private readonly forecastService: ForecastService,
    private readonly recommendationService: RecommendationService,
  ) {}

  async summary(storeCode?: string) {
    const sales = await this.salesRepo.find({ where: { storeCode } });
    const totalSales = sales.reduce((sum, row) => sum + Number(row.salesAmount ?? 0), 0);
    const totalGrossProfit = sales.reduce((sum, row) => sum + Number(row.grossProfit ?? 0), 0);
    const forecastDemand = await this.forecastService.totalForecastDemand(storeCode);
    const forecastAccuracy = await this.forecastService.accuracy(storeCode);
    const inventoryRisk = await this.recommendationService.inventoryRiskCount();

    return {
      totalSales: Number(totalSales.toFixed(2)),
      totalGrossProfit: Number(totalGrossProfit.toFixed(2)),
      forecastDemand: Number(forecastDemand.toFixed(2)),
      forecastAccuracy,
      inventoryRisk,
    };
  }
}

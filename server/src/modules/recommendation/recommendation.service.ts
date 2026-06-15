import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseRecommendation } from '../../entities/purchase-recommendation.entity';
import { ForecastService } from '../forecast/forecast.service';
import { InventoryService } from '../inventory/inventory.service';
import { GenerateRecommendationDto } from './dto/generate-recommendation.dto';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(PurchaseRecommendation)
    private readonly recommendationRepo: Repository<PurchaseRecommendation>,
    private readonly forecastService: ForecastService,
    private readonly inventoryService: InventoryService,
  ) {}

  async generate(dto: GenerateRecommendationDto) {
    const forecasts = await this.forecastService.findResults(dto.storeCode, dto.productCode);
    const forecastQuantity = forecasts.reduce((sum, row) => sum + Number(row.forecastQuantity), 0);
    const currentInventory = await this.inventoryService.getCurrentStock(
      dto.storeCode,
      dto.productCode,
    );
    const safetyStock = dto.safetyStock ?? Math.ceil(forecastQuantity * 0.2);
    const recommendedQuantity = Math.max(0, forecastQuantity + safetyStock - currentInventory);

    return this.recommendationRepo.save(
      this.recommendationRepo.create({
        storeCode: dto.storeCode,
        productCode: dto.productCode,
        recommendationDate: new Date().toISOString().slice(0, 10),
        forecastQuantity: Number(forecastQuantity.toFixed(2)),
        safetyStock,
        currentInventory,
        recommendedQuantity: Number(recommendedQuantity.toFixed(2)),
      }),
    );
  }

  findAll(storeCode?: string, productCode?: string) {
    return this.recommendationRepo.find({
      where: { storeCode, productCode },
      order: { createdAt: 'DESC' },
      take: 500,
    });
  }

  async inventoryRiskCount() {
    const rows = await this.recommendationRepo.find();
    return rows.filter((row) => Number(row.recommendedQuantity) > 0).length;
  }
}

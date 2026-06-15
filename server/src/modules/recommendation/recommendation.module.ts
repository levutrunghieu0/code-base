import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRecommendation } from '../../entities/purchase-recommendation.entity';
import { ForecastModule } from '../forecast/forecast.module';
import { InventoryModule } from '../inventory/inventory.module';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseRecommendation]), ForecastModule, InventoryModule],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}

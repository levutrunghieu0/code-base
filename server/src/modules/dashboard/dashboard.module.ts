import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesHistory } from '../../entities/sales-history.entity';
import { ForecastModule } from '../forecast/forecast.module';
import { RecommendationModule } from '../recommendation/recommendation.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesHistory]), ForecastModule, RecommendationModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

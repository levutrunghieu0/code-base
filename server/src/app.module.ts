import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ForecastModule } from './modules/forecast/forecast.module';
import { GeminiModule } from './modules/gemini/gemini.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { SalesModule } from './modules/sales/sales.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    SalesModule,
    InventoryModule,
    ForecastModule,
    RecommendationModule,
    DashboardModule,
    SchedulerModule,
    GeminiModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Log mọi HTTP request (method, url, status, duration)
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

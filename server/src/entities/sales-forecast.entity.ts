import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sales_forecast')
export class SalesForecast {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'store_code', length: 50 })
  storeCode: string;

  @Column({ name: 'product_code', length: 50 })
  productCode: string;

  @Column({ name: 'forecast_date', type: 'date' })
  forecastDate: string;

  @Column({ name: 'forecast_quantity', type: 'numeric', precision: 12, scale: 2 })
  forecastQuantity: number;

  @Column({
    name: 'forecast_sales_amount',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  forecastSalesAmount?: number;

  @Column({ name: 'model_name', length: 100, default: 'moving_average_7' })
  modelName: string;

  @Column({ type: 'numeric', precision: 10, scale: 4, nullable: true })
  mape?: number;

  @Column({ type: 'numeric', precision: 10, scale: 4, nullable: true })
  mae?: number;

  @Column({ type: 'numeric', precision: 10, scale: 4, nullable: true })
  rmse?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

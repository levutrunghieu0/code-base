import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_recommendation')
export class PurchaseRecommendation {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'store_code', length: 50 })
  storeCode: string;

  @Column({ name: 'product_code', length: 50 })
  productCode: string;

  @Column({ name: 'recommendation_date', type: 'date' })
  recommendationDate: string;

  @Column({ name: 'recommended_quantity', type: 'numeric', precision: 12, scale: 2 })
  recommendedQuantity: number;

  @Column({ name: 'safety_stock', type: 'numeric', precision: 12, scale: 2, default: 0 })
  safetyStock: number;

  @Column({ name: 'current_inventory', type: 'numeric', precision: 12, scale: 2, default: 0 })
  currentInventory: number;

  @Column({ name: 'forecast_quantity', type: 'numeric', precision: 12, scale: 2, default: 0 })
  forecastQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

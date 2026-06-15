import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('sales_history')
@Unique(['storeCode', 'productCode', 'saleDate'])
export class SalesHistory {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'store_code', length: 50 })
  storeCode: string;

  @Column({ name: 'product_code', length: 50 })
  productCode: string;

  @Column({ name: 'category_code', length: 50, nullable: true })
  categoryCode?: string;

  @Column({ name: 'sale_date', type: 'date' })
  saleDate: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  quantity: number;

  @Column({ name: 'sales_amount', type: 'numeric', precision: 12, scale: 2, nullable: true })
  salesAmount?: number;

  @Column({ name: 'gross_profit', type: 'numeric', precision: 12, scale: 2, nullable: true })
  grossProfit?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm';

@Entity('inventory')
@Unique(['storeCode', 'productCode'])
export class Inventory {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: string;

  @Column({ name: 'store_code', length: 50 })
  storeCode: string;

  @Column({ name: 'product_code', length: 50 })
  productCode: string;

  @Column({ name: 'current_stock', type: 'numeric', precision: 12, scale: 2, default: 0 })
  currentStock: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(@InjectRepository(Inventory) private readonly inventoryRepo: Repository<Inventory>) {}

  findAll(storeCode?: string, productCode?: string) {
    return this.inventoryRepo.find({
      where: { storeCode, productCode },
      order: { updatedAt: 'DESC' },
    });
  }

  async upsert(payload: Pick<Inventory, 'storeCode' | 'productCode' | 'currentStock'>) {
    const existing = await this.inventoryRepo.findOne({
      where: { storeCode: payload.storeCode, productCode: payload.productCode },
    });
    return this.inventoryRepo.save(this.inventoryRepo.create({ ...existing, ...payload }));
  }

  async getCurrentStock(storeCode: string, productCode: string) {
    const item = await this.inventoryRepo.findOne({ where: { storeCode, productCode } });
    return Number(item?.currentStock ?? 0);
  }
}

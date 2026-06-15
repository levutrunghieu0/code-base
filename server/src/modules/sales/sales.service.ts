import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesHistory } from '../../entities/sales-history.entity';
import { ImportSalesDto } from './dto/import-sales.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesHistory) private readonly salesRepo: Repository<SalesHistory>,
  ) {}

  async import(dto: ImportSalesDto) {
    const imported: SalesHistory[] = [];
    const duplicates: Array<{ storeCode: string; productCode: string; saleDate: string }> = [];

    for (const record of dto.records) {
      const exists = await this.salesRepo.findOne({
        where: {
          storeCode: record.storeCode,
          productCode: record.productCode,
          saleDate: record.saleDate,
        },
      });
      if (exists) {
        duplicates.push({
          storeCode: record.storeCode,
          productCode: record.productCode,
          saleDate: record.saleDate,
        });
        continue;
      }
      imported.push(await this.salesRepo.save(this.salesRepo.create(record)));
    }

    if (duplicates.length && !imported.length) {
      throw new ConflictException({ message: 'All records are duplicated', duplicates });
    }

    return {
      importedCount: imported.length,
      duplicateCount: duplicates.length,
      duplicates,
      records: imported,
    };
  }

  findHistory(filters: { storeCode?: string; productCode?: string; categoryCode?: string }) {
    return this.salesRepo.find({
      where: filters,
      order: { saleDate: 'DESC' },
      take: 500,
    });
  }

  async getRecentSales(storeCode: string, productCode: string, days = 90) {
    return this.salesRepo.find({
      where: { storeCode, productCode },
      order: { saleDate: 'DESC' },
      take: days,
    });
  }
}

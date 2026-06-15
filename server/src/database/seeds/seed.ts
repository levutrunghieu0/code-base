/**
 * Standalone seed script — run with: npm run seed
 * Creates default users and demo AI sales forecast data for visual dashboards.
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { User } from '../../entities/user.entity';
import { SalesHistory } from '../../entities/sales-history.entity';
import { Inventory } from '../../entities/inventory.entity';
import { SalesForecast } from '../../entities/sales-forecast.entity';
import { PurchaseRecommendation } from '../../entities/purchase-recommendation.entity';
import { Role } from '../../common/enums/role.enum';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'base_db',
  entities: [User, SalesHistory, Inventory, SalesForecast, PurchaseRecommendation],
  synchronize: true,
});

const userSeeds = [
  { name: 'Admin User', email: 'admin@example.com', password: 'Admin@123', role: Role.ADMIN },
  {
    name: 'Manager User',
    email: 'manager@example.com',
    password: 'Manager@123',
    role: Role.MANAGER,
  },
  { name: 'Regular User', email: 'user@example.com', password: 'User@123', role: Role.USER },
];

const products = [
  {
    storeCode: 'STORE001',
    productCode: 'BANANA-001',
    categoryCode: 'FRUIT',
    baseQuantity: 92,
    unitPrice: 1.2,
    gpRate: 0.34,
    currentStock: 80,
    safetyStock: 35,
  },
  {
    storeCode: 'STORE001',
    productCode: 'MILK-1L',
    categoryCode: 'DAIRY',
    baseQuantity: 68,
    unitPrice: 2.4,
    gpRate: 0.27,
    currentStock: 48,
    safetyStock: 28,
  },
  {
    storeCode: 'STORE002',
    productCode: 'BREAD-WHT',
    categoryCode: 'BAKERY',
    baseQuantity: 54,
    unitPrice: 1.8,
    gpRate: 0.31,
    currentStock: 42,
    safetyStock: 22,
  },
  {
    storeCode: 'STORE002',
    productCode: 'COFFEE-250G',
    categoryCode: 'GROCERY',
    baseQuantity: 28,
    unitPrice: 6.5,
    gpRate: 0.42,
    currentStock: 15,
    safetyStock: 12,
  },
];

function dateOffset(days: number): string {
  const date = new Date('2026-06-15T00:00:00.000Z');
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}

function demoQuantity(baseQuantity: number, dayIndex: number): number {
  const weeklyPattern = [0, 7, 4, -3, 5, 18, 22][dayIndex % 7];
  const trend = Math.floor(dayIndex / 7) * 2;

  return baseQuantity + weeklyPattern + trend;
}

async function seedUsers() {
  const repo = AppDataSource.getRepository(User);

  for (const s of userSeeds) {
    const existing = await repo.findOne({ where: { email: s.email } });
    if (existing) {
      console.log(`[SKIP] ${s.email} already exists`);

      continue;
    }

    const hashed = await bcrypt.hash(s.password, 10);
    const user = repo.create({ ...s, password: hashed });
    await repo.save(user);
    console.log(`[SEED] Created ${s.role}: ${s.email}`);
  }
}

async function seedSalesHistory() {
  const repo = AppDataSource.getRepository(SalesHistory);
  const records = products.flatMap((product) =>
    Array.from({ length: 30 }, (_, index) => {
      const quantity = demoQuantity(product.baseQuantity, index);
      const salesAmount = Number((quantity * product.unitPrice).toFixed(2));
      const grossProfit = Number((salesAmount * product.gpRate).toFixed(2));

      return repo.create({
        storeCode: product.storeCode,
        productCode: product.productCode,
        categoryCode: product.categoryCode,
        saleDate: dateOffset(index - 30),
        quantity,
        salesAmount,
        grossProfit,
      });
    }),
  );

  await repo.upsert(records, ['storeCode', 'productCode', 'saleDate']);
  console.log(`[SEED] Upserted ${records.length} sales history records`);
}

async function seedInventory() {
  const repo = AppDataSource.getRepository(Inventory);
  const records = products.map((product) =>
    repo.create({
      storeCode: product.storeCode,
      productCode: product.productCode,
      currentStock: product.currentStock,
    }),
  );

  await repo.upsert(records, ['storeCode', 'productCode']);
  console.log(`[SEED] Upserted ${records.length} inventory records`);
}

async function seedForecastsAndRecommendations() {
  const forecastRepo = AppDataSource.getRepository(SalesForecast);
  const recommendationRepo = AppDataSource.getRepository(PurchaseRecommendation);
  const forecasts: SalesForecast[] = [];
  const recommendations: PurchaseRecommendation[] = [];

  for (const product of products) {
    let forecastTotal = 0;

    for (let index = 1; index <= 7; index += 1) {
      const forecastQuantity = demoQuantity(product.baseQuantity + 6, index + 30);
      forecastTotal += forecastQuantity;

      forecasts.push(
        forecastRepo.create({
          storeCode: product.storeCode,
          productCode: product.productCode,
          forecastDate: dateOffset(index),
          forecastQuantity,
          forecastSalesAmount: Number((forecastQuantity * product.unitPrice).toFixed(2)),
          modelName: 'seed_moving_average_7',
          mape: 8.75,
          mae: 5.2,
          rmse: 6.4,
        }),
      );
    }

    recommendations.push(
      recommendationRepo.create({
        storeCode: product.storeCode,
        productCode: product.productCode,
        recommendationDate: dateOffset(1),
        forecastQuantity: forecastTotal,
        safetyStock: product.safetyStock,
        currentInventory: product.currentStock,
        recommendedQuantity: Math.max(
          forecastTotal + product.safetyStock - product.currentStock,
          0,
        ),
      }),
    );
  }

  await forecastRepo.delete({ modelName: 'seed_moving_average_7' });
  await forecastRepo.save(forecasts);
  await recommendationRepo.delete({ recommendationDate: dateOffset(1) });
  await recommendationRepo.save(recommendations);
  console.log(`[SEED] Recreated ${forecasts.length} forecast records`);
  console.log(`[SEED] Recreated ${recommendations.length} purchase recommendations`);
}

async function seed() {
  await AppDataSource.initialize();
  console.log('Database connected.');

  await seedUsers();
  await seedSalesHistory();
  await seedInventory();
  await seedForecastsAndRecommendations();

  await AppDataSource.destroy();
  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

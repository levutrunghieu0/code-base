/**
 * Standalone seed script — run with: npm run seed
 * Creates default ADMIN, MANAGER, and USER accounts.
 */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { User } from '../../entities/user.entity';
import { Role } from '../../common/enums/role.enum';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'base_db',
  entities: [User],
  synchronize: true,
});

const seeds = [
  { name: 'Admin User', email: 'admin@example.com', password: 'Admin@123', role: Role.ADMIN },
  { name: 'Manager User', email: 'manager@example.com', password: 'Manager@123', role: Role.MANAGER },
  { name: 'Regular User', email: 'user@example.com', password: 'User@123', role: Role.USER },
];

async function seed() {
  await AppDataSource.initialize();
  console.log('Database connected.');

  const repo = AppDataSource.getRepository(User);

  for (const s of seeds) {
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

  await AppDataSource.destroy();
  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

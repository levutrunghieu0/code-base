import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Email already registered');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({ ...dto, password: hashed });
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    // addSelect is needed because password has select:false on the column
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.refreshToken')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findByIdWithTokens(id: string): Promise<User | null> {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.refreshToken')
      .where('user.id = :id', { id })
      .getOne();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    Object.assign(user, dto);
    return this.repo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.repo.remove(user);
  }

  async updateRefreshToken(id: string, token: string | null): Promise<void> {
    const hashed = token ? await bcrypt.hash(token, 10) : null;
    await this.repo.update(id, { refreshToken: hashed });
  }
}

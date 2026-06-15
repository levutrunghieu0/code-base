import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/** Service layer — business logic; mọi truy cập DB đi qua UsersRepository */
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.usersRepository.findByEmail(dto.email);
    if (exists) {
      throw new ConflictException('Email already registered');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.create({ ...dto, password: hashed });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmailWithSecrets(email);
  }

  async findByIdWithTokens(id: string): Promise<User | null> {
    return this.usersRepository.findByIdWithRefreshToken(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    Object.assign(user, dto);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }

  async updateRefreshToken(id: string, token: string | null): Promise<void> {
    // Hash refresh token trước khi lưu — DB lộ cũng không dùng lại được token
    const hashed = token ? await bcrypt.hash(token, 10) : null;
    await this.usersRepository.updateRefreshToken(id, hashed);
  }
}

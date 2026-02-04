import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);

    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);

    this.logger.log(`User created successfully (id=${savedUser.id})`);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    this.logger.log(`Fetching user with id=${id}`);
    return await this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user id=${id}`);
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    this.logger.warn(`Deleting user id=${id}`);
    await this.usersRepository.delete(id);
  }
}
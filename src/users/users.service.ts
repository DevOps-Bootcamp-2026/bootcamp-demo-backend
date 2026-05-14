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
    @InjectRepository(User, 'write')
    private writeUsersRepository: Repository<User>,
    @InjectRepository(User, 'read')
    private readUsersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);

    const user = this.writeUsersRepository.create(createUserDto);
    const savedUser = await this.writeUsersRepository.save(user);

    this.logger.log(`User created successfully (id=${savedUser.id})`);
    return savedUser;
  }

  async findAll({ skip, take }: { skip: number; take: number }): Promise<User[]> {
    this.logger.log(`Fetching users - page skip: ${skip}, take: ${take}`);
    return await this.readUsersRepository.find({ skip, take });
  }

  async findOne(id: number): Promise<User> {
    this.logger.log(`Fetching user with id=${id}`);
    return await this.readUsersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user id=${id}`);
    await this.writeUsersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    this.logger.warn(`Deleting user id=${id}`);
    await this.writeUsersRepository.delete(id);
  }
}
import { Injectable } from '@nestjs/common';
import { Base, PrismaClient, User } from '@prisma/client';
import { pagination } from 'src/common/extenders/common.extender';
import { PaginationResult } from 'src/common/interfaces/pagination.interface';
import { BaseQueryDto } from './dto/base-query.dto';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';

@Injectable()
export class BaseService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateBaseDto, user: User): Promise<Base> {
    return await this.prisma.base.create({ data });
  }

  async findAll(user: User): Promise<Base[]> {
    return await this.prisma.base.findMany();
  }

  async paginate(
    { page, perPage, orderBy, search }: BaseQueryDto,
    user: User,
  ): Promise<PaginationResult<Base>> {
    return (await this.prisma.$extends(pagination).base.paginate({
      page,
      perPage,
      orderBy,
      where: {},
    })) as unknown as PaginationResult<Base>;
  }

  async findOne(id: number, user: User): Promise<Base> {
    return await this.prisma.base.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, data: UpdateBaseDto, user: User): Promise<Base> {
    return await this.prisma.base.update({ where: { id }, data });
  }

  async set(id: number, user: User): Promise<Base> {
    return await this.prisma.base.update({ where: { id }, data: {} });
  }

  async remove(id: number, user: User): Promise<void> {
    await this.prisma.base.delete({ where: { id } });
  }
}

import { Injectable } from "@nestjs/common";
import { Demo, Prisma, PrismaClient, User } from "@prisma/client";
import { pagination } from "src/common/extenders/common.extender";
import { PaginationResult } from "src/common/interfaces/pagination.interface";
import { CreateDemoDto } from "./dto/create-demo.dto";
import { DemoQueryDto } from "./dto/demo-query.dto";
import { UpdateDemoDto } from "./dto/update-demo.dto";

@Injectable()
export class DemoService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateDemoDto, user: User): Promise<Demo> {
    return await this.prisma.demo.create({ data });
  }

  async findAll(user: User): Promise<Demo[]> {
    return await this.prisma.demo.findMany();
  }

  async paginate(
    { page, perPage, orderBy, search }: DemoQueryDto,
    user: User
  ): Promise<PaginationResult<Demo>> {
    return (await this.prisma.$extends(pagination).demo.paginate({
      page,
      perPage,
      orderBy,
      where: {
        OR: Object.keys(Prisma.DemoOrderByRelevanceFieldEnum).map((key) => ({
          [key]: { contains: search || "" },
        })),
      },
    })) as unknown as PaginationResult<Demo>;
  }

  async findOne(id: number, user: User): Promise<Demo> {
    return await this.prisma.demo.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, data: UpdateDemoDto, user: User): Promise<Demo> {
    return await this.prisma.demo.update({ where: { id }, data });
  }

  async set(id: number, user: User): Promise<Demo> {
    return await this.prisma.demo.update({ where: { id }, data: {} });
  }

  async remove(id: number, user: User): Promise<void> {
    await this.prisma.demo.delete({ where: { id } });
  }
}

import { Injectable } from "@nestjs/common";
import { Demo, Prisma, PrismaClient, User as PrismaUser } from "@prisma/client";
import { pagination } from "src/common/extenders/common.extender";
import { PaginationResult } from "src/common/interfaces/pagination.interface";
import { CreateDemoDto } from "./dto/create-demo.dto";
import { DemoQueryDto } from "./dto/demo-query.dto";
import { UpdateDemoDto } from "./dto/update-demo.dto";

@Injectable()
export class DemoService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateDemoDto, user: PrismaUser): Promise<Demo> {
    return await this.prisma.demo.create({ data });
  }

  async findAll(user: PrismaUser): Promise<Demo[]> {
    return await this.prisma.demo.findMany();
  }

  async paginate(
    { page, perPage, orderBy, search }: DemoQueryDto,
    user: PrismaUser
  ): Promise<PaginationResult<Demo>> {
    return (await this.prisma.$extends(pagination).demo.paginate({
      page,
      perPage,
      orderBy,
      where: {
        //@ts-ignore
        OR: Object.keys(Prisma.DemoOrderByRelevanceFieldEnum).map((key) => ({
          [key]: { contains: search || "" },
        })),
      },
    })) as unknown as PaginationResult<Demo>;
  }

  async findOne(id: number, user: PrismaUser): Promise<Demo> {
    return await this.prisma.demo.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, data: UpdateDemoDto, user: PrismaUser): Promise<Demo> {
    return await this.prisma.demo.update({ where: { id }, data });
  }

  async set(id: number, user: PrismaUser): Promise<Demo> {
    return await this.prisma.demo.update({ where: { id }, data: {} });
  }

  async remove(id: number, user: PrismaUser): Promise<void> {
    await this.prisma.demo.delete({ where: { id } });
  }
}

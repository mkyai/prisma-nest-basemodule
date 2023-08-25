import { Module } from '@nestjs/common';
import { PrismaManager, PrismaService } from 'src/prisma';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

@Module({
  controllers: [BaseController],
  providers: [BaseService, PrismaService, PrismaManager],
})
export class BaseModule {}

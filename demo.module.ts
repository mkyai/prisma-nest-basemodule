import { Module } from "@nestjs/common";
import { PrismaManager, PrismaService } from "src/prisma";
import { DemoController } from "./demo.controller";
import { DemoService } from "./demo.service";

@Module({
  controllers: [DemoController],
  providers: [DemoService, PrismaService, PrismaManager],
})
export class DemoModule {}

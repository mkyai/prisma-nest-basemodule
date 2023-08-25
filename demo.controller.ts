import {
  ApiController,
  ApiDelete,
  ApiGet,
  ApiPatch,
  ApiPost,
  ApiPut,
  AuthUser,
} from "@micro-nest/rest";
import { Body, Param, Query } from "@nestjs/common";
import { User } from "@prisma/client";
import { summaryData } from "src/common/constants/app.constants";
import { IdParamDto } from "src/common/dto/id-param.dto";
import { DemoService } from "./demo.service";
import { CreateDemoDto } from "./dto/create-demo.dto";
import { DemoQueryDto } from "./dto/demo-query.dto";
import { UpdateDemoDto } from "./dto/update-demo.dto";
const { demo: summary }: any = summaryData;
const _ = { summary };

@ApiController()
export class DemoController {
  constructor(private readonly service: DemoService) {}

  @ApiPost(_)
  create(@Body() dto: CreateDemoDto, @AuthUser() user: User) {
    return this.service.create(dto, user);
  }

  @ApiGet(_)
  findAll(@AuthUser() user: User) {
    return this.service.findAll(user);
  }

  @ApiGet(_)
  findOne(@Param() { id }: IdParamDto, @AuthUser() user: User) {
    return this.service.findOne(+id, user);
  }

  @ApiGet(_)
  paginate(@Query() query: DemoQueryDto, @AuthUser() user: User) {
    return this.service.paginate(query, user);
  }

  @ApiPatch(_)
  update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateDemoDto,
    @AuthUser() user: User
  ) {
    return this.service.update(+id, dto, user);
  }

  @ApiPut(_)
  set(@Param() { id }: IdParamDto, @AuthUser() user: User) {
    return this.service.set(id, user);
  }

  @ApiDelete(_)
  remove(@Param() { id }: IdParamDto, @AuthUser() user: User) {
    return this.service.remove(+id, user);
  }
}

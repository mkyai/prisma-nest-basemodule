import {
  ApiController,
  ApiDelete,
  ApiGet,
  ApiPatch,
  ApiPost,
  ApiPut,
  AuthUser,
} from '@micro-nest/rest';
import { Body, Param, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { summaryData } from 'src/common/constants/app.constants';
import { IdParamDto } from 'src/common/dto/id-param.dto';
import { BaseService } from './base.service';
import { BaseQueryDto } from './dto/base-query.dto';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
const { base: summary } = summaryData;
const _ = { summary };

@ApiController()
export class BaseController {
  constructor(private readonly service: BaseService) {}

  @ApiPost(_)
  create(@Body() dto: CreateBaseDto, @AuthUser() user: User) {
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
  paginate(@Query() query: BaseQueryDto, @AuthUser() user: User) {
    return this.service.paginate(query, user);
  }

  @ApiPatch(_)
  update(
    @Param() { id }: IdParamDto,
    @Body() dto: UpdateBaseDto,
    @AuthUser() user: User,
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

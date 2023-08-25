import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class BaseQueryDto extends PaginationDto {
  @ApiProperty({
    enum: Prisma.BaseScalarFieldEnum,
    default: 'id',
    description: 'Specify the ordering column',
  })
  @IsOptional()
  @ApiPropertyOptional()
  @IsEnum(Prisma.BaseScalarFieldEnum)
  readonly orderAt?: Prisma.BaseScalarFieldEnum;

  @ApiProperty({
    type: String,
    description: 'Specify the search value',
  })
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  readonly search?: string;
}

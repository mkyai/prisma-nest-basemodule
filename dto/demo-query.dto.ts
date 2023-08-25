import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class DemoQueryDto extends PaginationDto {
  @ApiProperty({
    enum: Prisma.DemoScalarFieldEnum,
    default: "id",
    description: "Specify the ordering column",
  })
  @IsOptional()
  @ApiPropertyOptional()
  @IsEnum(Prisma.DemoScalarFieldEnum)
  readonly orderAt?: Prisma.DemoScalarFieldEnum;

  @ApiProperty({
    type: String,
    description: "Specify the search value",
  })
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  readonly search?: string;
}

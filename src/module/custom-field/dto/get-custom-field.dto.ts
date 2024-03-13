import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SortTypeMongo } from 'src/shared/constants';

export class GetCustomFieldDto {
  @IsOptional()
  @ApiProperty({
    description: 'isActive',
    example: 'true',
    required: false,
  })
  isActive: string;

  @IsOptional()
  @ApiProperty({
    description: 'search string',
    example: 'test',
    required: false,
  })
  search: string;

  @IsOptional()
  @ApiProperty({
    description: 'current page',
    example: 1,
    required: false,
  })
  page: number;

  @IsOptional()
  @ApiProperty({
    description: 'record limit',
    example: 10,
    required: false,
  })
  limit: number;

  @IsOptional()
  @ApiProperty({
    description: 'sort type',
    example: SortTypeMongo.asc,
    required: false,
  })
  sort: SortTypeMongo;

  @IsOptional()
  @ApiProperty({
    description: 'order by',
    example: 'created_at',
    required: false,
  })
  orderby: string;

  @IsOptional()
  @ApiProperty({
    description: 'Skipp pagination',
    example: true,
    required: false,
  })
  skip_pagination: string;
}

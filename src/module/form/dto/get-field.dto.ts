import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { SortTypeMongo } from 'src/shared/constants';

export class GetFieldDto {
  @IsOptional()
  @ApiProperty({
    description: 'form_id',
    example: '6545e58fbf321f1d1106c5c4',
    required: false,
  })
  form_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'step_id',
    example: '6545e58fbf321f1d1106c5c4',
    required: false,
  })
  step_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'group_id',
    example: '6545e58fbf321f1d1106c5c4',
    required: false,
  })
  group_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'isListView',
    example: true,
    required: false,
  })
  isListView: boolean;

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
}

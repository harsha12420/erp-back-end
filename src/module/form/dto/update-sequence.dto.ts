import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateSequenceDto {
  @IsOptional()
  @ApiProperty({
    description: 'form_id',
    example: '6545e58fbf321f1d1106c5c4',
    required: false,
  })
  form_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'sequenceIds',
    example: [
      {
        id: '655f1c7c087cda085210f5bb',
        sequence: 1,
      },
      {
        id: '655f1c7c087cda085210f5bc',
        sequence: 2,
      },
      {
        id: '655f1c7c087cda085210f5bd',
        sequence: 3,
      },
      {
        id: '6541f1c53704c86e8d0b07d9',
        sequence: 4,
      },
    ],
    required: false,
  })
  sequenceIds: {
    id: Types.ObjectId;
    sequence: number;
  }[];
}

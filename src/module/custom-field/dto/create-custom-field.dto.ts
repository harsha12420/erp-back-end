import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomFieldDto {
  @IsOptional()
  @ApiProperty({
    description: 'id',
    example: 'sdadsadsadasd',
    required: false,
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'name',
    example: 'First Name',
    required: true,
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    description: 'isSearch',
    example: true,
    required: false,
  })
  isSearch: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'isRequired',
    example: true,
    required: false,
  })
  isRequired: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'isActive',
    example: true,
    required: false,
  })
  isActive: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: 'formControlName',
    example: 'firstName',
    required: true,
  })
  formControlName: string;

  @IsOptional()
  @ApiProperty({
    description: 'options',
    example: '[]',
    required: false,
  })
  options: string[];

  @IsOptional()
  @ApiProperty({
    description: 'optionsType',
    example: 'single/multiple',
    required: false,
  })
  optionsType: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'field_id',
    example: '6541fdb7c6068a9e2852df70',
    required: true,
  })
  field_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'reference_id',
    example: '6541fdb7c6068a9e2852df70',
    required: false,
  })
  reference_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'dependentOn_id',
    example: '6541fdb7c6068a9e2852df70',
    required: false,
  })
  dependentOn_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'isDynamic',
    example: true,
    required: false,
  })
  isDynamic: boolean;
}

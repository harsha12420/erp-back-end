import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFormDto {
  @IsOptional()
  @ApiProperty({
    description: 'id',
    example: 'sdadsadsadasd',
    required: false,
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'form_id',
    example: '6541f21a3704c86e8d0b07fa',
    required: true,
  })
  form_id: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty({
    description: 'fields_array',
    example: [
      {
        _id: '6545e58fbf321f1d1106c5c4',
        field_id: '6545e58fbf321f1d1106c5c4',
        isRequired: true,
        fieldName: 'reference',
        name: 'Pincode',
        formControlName: 'pincode',
        isFixed: true,
        reference_id: '65423bbf592e1a74115c2ac3',
        dependentOn_id: null,
        isMultiple: false,
        isListView: false,
        options: [],
        optionsType: 'Single/Multiple',
        sequence: 1,
        isSearch: false,
      },
      {
        _id: '6545e58fbf321f1d1106c5c4',
        field_id: '6545e59dbf321f1d1106c5c8',
        isRequired: true,
        fieldName: 'reference',
        name: 'Village',
        formControlName: 'village',
        isFixed: true,
        reference_id: null,
        dependentOn_id: null,
        isMultiple: false,
        isListView: true,
        options: [],
        optionsType: 'Single/Multiple',
        sequence: 2,
        isSearch: true,
      },
    ],
    required: true,
  })
  fields_array: {
    _id: Types.ObjectId;
    field_id: Types.ObjectId;
    isRequired: boolean;
    fieldName: string;
    formControlName: string;
    name: string;
    isFixed: boolean;
    reference_id: Types.ObjectId;
    dependentOn_id: Types.ObjectId;
    isListView: boolean;
    options: string[];
    optionsType: string;
    sequence: number;
    isSearch: boolean;
  }[];

  @IsOptional()
  @ApiProperty({
    description: 'step_id',
    example: '6541f3f803c39a518c36e1a8',
    required: false,
  })
  step_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'group_id',
    example: '65433bd08eedf4bed61f49f7',
    required: false,
  })
  group_id: Types.ObjectId;

  @IsOptional()
  @ApiProperty({
    description: 'isMultiple',
    example: true,
    required: false,
  })
  isMultiple: boolean;
}

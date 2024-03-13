import { Controller, Get, Post, Body, Param, Delete, UseGuards, Version } from '@nestjs/common';
import { InputFieldService } from './input-field.service';
import { CreateInputFieldDto } from './dto/create-input-field.dto';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { UserRoleType } from 'src/auth/role';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiHeaders([
  {
    name: 'Accept-Version',
    allowEmptyValue: false,
    enum: ['v1', 'v2'],
    required: true,
  },
])
@ApiTags('Input Field List')
@Controller('input-field')
export class InputFieldController {
  constructor(private readonly inputFieldService: InputFieldService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post()
  create(@Body() createInputFieldDto: CreateInputFieldDto) {
    return this.inputFieldService.create(createInputFieldDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get()
  findAll() {
    return this.inputFieldService.findAll();
  }
}

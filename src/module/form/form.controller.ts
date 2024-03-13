import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Version } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { GetFormDto } from './dto/get-form.dto';
import { GetFieldDto } from './dto/get-field.dto';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { UserRoleType } from 'src/auth/role';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateSequenceDto } from './dto/update-sequence.dto';

@ApiHeaders([
  {
    name: 'Accept-Version',
    allowEmptyValue: false,
    enum: ['v1', 'v2'],
    required: true,
  },
])
@ApiTags('Form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formService.create(createFormDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get()
  findAll(@Query() getFormDto: GetFormDto) {
    return this.formService.findAll(getFormDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get('getFields')
  getFields(@Query() getFieldDto: GetFieldDto) {
    return this.formService.getFields(getFieldDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get('getDataBySequence')
  getDataBySequence(@Query() getFieldDto: GetFieldDto) {
    return this.formService.getDataBySequence(getFieldDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post('changeSequence')
  changeSequence(@Body() updateSequenceDto: UpdateSequenceDto) {
    return this.formService.changeSequence(updateSequenceDto);
  }
}

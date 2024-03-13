import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Version } from '@nestjs/common';
import { FormListService } from './form-list.service';
import { CreateFormListDto } from './dto/create-form-list.dto';
import { GetFormListDto } from './dto/get-form-list.dto';
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
@ApiTags('Form List')
@Controller('form-list')
export class FormListController {
  constructor(private readonly formListService: FormListService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post()
  create(@Body() createFormListDto: CreateFormListDto) {
    return this.formListService.create(createFormListDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get()
  findAll(@Query() getFormListDto: GetFormListDto) {
    return this.formListService.findAll(getFormListDto);
  }
}

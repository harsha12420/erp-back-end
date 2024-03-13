import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Version } from '@nestjs/common';
import { CustomFieldService } from './custom-field.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { GetCustomFieldDto } from './dto/get-custom-field.dto';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoleType } from 'src/auth/role';

@ApiHeaders([
  {
    name: 'Accept-Version',
    allowEmptyValue: false,
    enum: ['v1', 'v2'],
    required: true,
  },
])
@ApiTags('Custom Field')
@Controller('custom-field')
export class CustomFieldController {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post()
  create(@Body() createCustomFieldDto: CreateCustomFieldDto) {
    return this.customFieldService.create(createCustomFieldDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post('/changeStatus')
  changeStatus(@Body() data: string) {
    return this.customFieldService.changeStatus(data);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get()
  findAll(@Query() getCustomFieldDto: GetCustomFieldDto) {
    return this.customFieldService.findAll(getCustomFieldDto);
  }
}

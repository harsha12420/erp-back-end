import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Version } from '@nestjs/common';
import { FormValueService } from './form-value.service';
import { CreateFormValueDto } from './dto/create-form-value.dto';
import { UpdateFormValueDto } from './dto/update-form-value.dto';
import { GetPresignedUrlDto } from './dto/get-presigned-url.dto';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoleType } from 'src/auth/role';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';

@ApiHeaders([
  {
    name: 'Accept-Version',
    allowEmptyValue: false,
    enum: ['v1', 'v2'],
    required: true,
  },
])
@ApiTags('Form Value')
@Controller('form-value')
export class FormValueController {
  constructor(private readonly formValueService: FormValueService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post()
  create(@Body() createFormValueDto: CreateFormValueDto) {
    return this.formValueService.create(createFormValueDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get()
  findAll() {
    return this.formValueService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post('presign-url')
  getPresignUrlForMediaUpload(@Body() getPresignedUrlDto: GetPresignedUrlDto) {
    return this.formValueService.getPresignUrlForMediaUpload(getPresignedUrlDto);
  }
}

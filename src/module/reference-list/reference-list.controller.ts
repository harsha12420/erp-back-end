import { Controller, Get, Post, Body, Param, Delete, UseGuards, Version } from '@nestjs/common';
import { ReferenceListService } from './reference-list.service';
import { CreateReferenceListDto } from './dto/create-reference-list.dto';
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
@ApiTags('Reference List')
@Controller('reference-list')
export class ReferenceListController {
  constructor(private readonly referenceListService: ReferenceListService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post()
  create(@Body() createReferenceListDto: CreateReferenceListDto) {
    return this.referenceListService.create(createReferenceListDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get()
  findAll() {
    return this.referenceListService.findAll();
  }
}

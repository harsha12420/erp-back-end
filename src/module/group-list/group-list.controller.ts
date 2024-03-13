import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Version } from '@nestjs/common';
import { GroupListService } from './group-list.service';
import { CreateGroupListDto } from './dto/create-group-list.dto';
import { GetGroupListDto } from './dto/get-group-list.dto';
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
@ApiTags('Group List')
@Controller('group-list')
export class GroupListController {
  constructor(private readonly groupListService: GroupListService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post()
  create(@Body() createGroupListDto: CreateGroupListDto) {
    return this.groupListService.create(createGroupListDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get()
  findAll(@Query() getGroupListDto: GetGroupListDto) {
    return this.groupListService.findAll(getGroupListDto);
  }
}

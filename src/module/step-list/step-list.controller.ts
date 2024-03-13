import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Version } from '@nestjs/common';
import { StepListService } from './step-list.service';
import { CreateStepListDto } from './dto/create-step-list.dto';
import { GetStepListDto } from './dto/get-step-list.dto';
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import { UserRoleType } from 'src/auth/role';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateSequenceDto } from '../form/dto/update-sequence.dto';

@ApiHeaders([
  {
    name: 'Accept-Version',
    allowEmptyValue: false,
    enum: ['v1', 'v2'],
    required: true,
  },
])
@ApiTags('Step List')
@Controller('step-list')
export class StepListController {
  constructor(private readonly stepListService: StepListService) {}

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post()
  create(@Body() createStepListDto: CreateStepListDto) {
    return this.stepListService.create(createStepListDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Get()
  findAll(@Query() getStepListDto: GetStepListDto) {
    return this.stepListService.findAll(getStepListDto);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(UserRoleType.schoolAdmin, UserRoleType.staff)
  @ApiBearerAuth('bearer')
  @Version('v1')
  @Post('changeSequence')
  changeSequence(@Body() updateSequenceDto: UpdateSequenceDto) {
    return this.stepListService.changeSequence(updateSequenceDto);
  }
}

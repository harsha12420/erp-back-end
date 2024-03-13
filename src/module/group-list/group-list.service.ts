import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateGroupListDto } from './dto/create-group-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GroupList } from './schemas/group-list.schema';
import { Model, Types } from 'mongoose';
import { ResponseBuilder } from 'src/shared/responseBuilder';
import { Constants } from 'src/shared/constants';
import { GetGroupListDto } from './dto/get-group-list.dto';

@Injectable()
export class GroupListService {
  private readonly logger = new Logger('GroupListService');
  constructor(
    @InjectModel(GroupList.name)
    private readonly groupListModel: Model<GroupList>,
  ) {}
  async create(createGroupListDto: CreateGroupListDto) {
    try {
      const isGroupList = await this.groupListModel.findOne({
        groupName: createGroupListDto.groupName,
        form_id: createGroupListDto.form_id,
        step_id: createGroupListDto.step_id,
      });
      if (isGroupList) {
        return ResponseBuilder.errorMessage(Constants.ResponseMessages.GROUP_ALREADY_EXIST);
      } else {
        const result = await this.groupListModel.create(createGroupListDto);
        return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
      }
    } catch (error) {
      this.logger.log(error);
      return ResponseBuilder.errorMessage(Constants.ResponseMessages.BAD_REQUEST);
    }
  }

  async findAll(getGroupListDto: GetGroupListDto) {
    try {
      const pipeline = [];
      const matchFormCondition = {
        step_id: new Types.ObjectId(getGroupListDto.step_id),
      };
      if (getGroupListDto.step_id) {
        pipeline.push({
          $match: matchFormCondition,
        });
      }
      pipeline.push(
        {
          $lookup: {
            from: 'formlists',
            localField: 'form_id',
            foreignField: '_id',
            as: 'form',
          },
        },
        {
          $unwind: {
            path: '$form',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'steplists',
            localField: 'step_id',
            foreignField: '_id',
            as: 'steps',
          },
        },
        {
          $unwind: {
            path: '$steps',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            groupName: 1,
            form_id: 1,
            step_id: 1,
            isActive: 1,
            stepName: '$steps.stepName',
            formName: '$form.formName',
          },
        },
      );
      const result = await this.groupListModel.aggregate(pipeline);
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}

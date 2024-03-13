import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateStepListDto } from './dto/create-step-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { StepList } from './schemas/step-list.schema';
import { Model, Types } from 'mongoose';
import { ResponseBuilder } from 'src/shared/responseBuilder';
import { Constants } from 'src/shared/constants';
import { GetStepListDto } from './dto/get-step-list.dto';
import { UpdateSequenceDto } from '../form/dto/update-sequence.dto';

@Injectable()
export class StepListService {
  private readonly logger = new Logger('StepListService');
  constructor(
    @InjectModel(StepList.name)
    private readonly stepListModel: Model<StepList>,
  ) {}
  async create(createStepListDto: CreateStepListDto) {
    try {
      const isStepList = await this.stepListModel.findOne({
        stepName: createStepListDto.stepName,
        form_id: createStepListDto.form_id,
      });
      if (isStepList) {
        return ResponseBuilder.errorMessage(Constants.ResponseMessages.STEP_ALREADY_EXIST);
      } else {
        const result = await this.stepListModel.create(createStepListDto);
        return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
      }
    } catch (error) {
      this.logger.log(error);
      return ResponseBuilder.errorMessage(Constants.ResponseMessages.BAD_REQUEST);
    }
  }

  async findAll(getStepListDto: GetStepListDto) {
    try {
      const pipeline = [];
      const matchFormCondition = {
        form_id: new Types.ObjectId(getStepListDto.form_id),
      };
      if (getStepListDto.form_id) {
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
          $sort: {
            sequence: 1,
          },
        },
        {
          $project: {
            _id: 1,
            stepName: 1,
            form_id: 1,
            isActive: 1,
            sequence: 1,
            formName: '$form.formName',
          },
        },
      );
      const result = await this.stepListModel.aggregate(pipeline);
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
  async changeSequence(updateSequenceDto: UpdateSequenceDto) {
    try {
      const bulkUpdateOperations = updateSequenceDto.sequenceIds.map((sequenceId) => ({
        updateOne: {
          filter: {
            form_id: new Types.ObjectId(updateSequenceDto.form_id),
            _id: new Types.ObjectId(sequenceId.id),
          },
          update: {
            $set: {
              sequence: sequenceId.sequence,
            },
          },
        },
      }));
      const result = await this.stepListModel.bulkWrite(bulkUpdateOperations);
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}

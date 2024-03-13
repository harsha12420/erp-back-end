import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateReferenceListDto } from './dto/create-reference-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReferenceList } from './schemas/reference-list.schema';
import { Model } from 'mongoose';
import { ResponseBuilder } from 'src/shared/responseBuilder';
import { Constants } from 'src/shared/constants';

@Injectable()
export class ReferenceListService {
  private readonly logger = new Logger('ReferenceListService');
  constructor(
    @InjectModel(ReferenceList.name)
    private readonly referenceListModel: Model<ReferenceList>,
  ) {}
  async create(createReferenceListDto: CreateReferenceListDto) {
    try {
      const isReferenceList = await this.referenceListModel.findOne({
        name: createReferenceListDto.name,
      });
      if (isReferenceList) {
        return ResponseBuilder.errorMessage(Constants.ResponseMessages.REFERENCE_ALREADY_EXIST);
      } else {
        const result = await this.referenceListModel.create(createReferenceListDto);
        return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
      }
    } catch (error) {
      this.logger.log(error);
      return ResponseBuilder.errorMessage(Constants.ResponseMessages.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const result = await this.referenceListModel.find().exec();
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}

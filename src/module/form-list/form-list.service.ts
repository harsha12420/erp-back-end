import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateFormListDto } from './dto/create-form-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FormList } from './schemas/form-list.schema';
import { Model } from 'mongoose';
import { ResponseBuilder } from 'src/shared/responseBuilder';
import { Constants } from 'src/shared/constants';
import { GetFormListDto } from './dto/get-form-list.dto';

@Injectable()
export class FormListService {
  private readonly logger = new Logger('FormListService');
  constructor(
    @InjectModel(FormList.name)
    private readonly formListModel: Model<FormList>,
  ) {}

  async create(createFormListDto: CreateFormListDto) {
    try {
      const isFormList = await this.formListModel.findOne({
        formName: createFormListDto.formName,
        formType: createFormListDto.formType,
      });
      if (isFormList) {
        return ResponseBuilder.errorMessage(Constants.ResponseMessages.FORM_ALREADY_EXIST);
      } else {
        const result = await this.formListModel.create(createFormListDto);
        return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
      }
    } catch (error) {
      this.logger.log(error);
      return ResponseBuilder.errorMessage(Constants.ResponseMessages.BAD_REQUEST);
    }
  }

  async findAll(getFormListDto: GetFormListDto) {
    try {
      let matchCondition;
      if (getFormListDto.formType) {
        matchCondition = { formType: getFormListDto.formType };
      }
      const result = await this.formListModel.find(matchCondition).exec();
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async getFormList(data) {
    try {
      const formList = await this.formListModel.find({ isActive: true, formType: data?.formType }).lean();
      return ResponseBuilder.data(formList, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}

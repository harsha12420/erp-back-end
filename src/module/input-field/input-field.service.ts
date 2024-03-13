import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateInputFieldDto } from './dto/create-input-field.dto';
import { InputField } from './schemas/input-field.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseBuilder } from 'src/shared/responseBuilder';
import { Constants } from 'src/shared/constants';

@Injectable()
export class InputFieldService {
  private readonly logger = new Logger('InputFieldService');
  constructor(
    @InjectModel(InputField.name)
    private readonly inputFieldModel: Model<InputField>,
  ) {}
  async create(createInputFieldDto: CreateInputFieldDto) {
    try {
      const isInputField = await this.inputFieldModel.findOne({
        fieldName: createInputFieldDto.fieldName,
      });
      if (isInputField) {
        return ResponseBuilder.errorMessage(Constants.ResponseMessages.INPUTFIELD_ALREADY_EXIST);
      } else {
        const result = await this.inputFieldModel.create(createInputFieldDto);
        return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
      }
    } catch (error) {
      this.logger.log(error);
      return ResponseBuilder.errorMessage(Constants.ResponseMessages.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const result = await this.inputFieldModel.find().exec();
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}

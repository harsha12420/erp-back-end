import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateFormValueDto } from './dto/create-form-value.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FormValue } from './schemas/form-value.schema';
import { Model, Types } from 'mongoose';
import { ResponseBuilder } from 'src/shared/responseBuilder';
import { Constants } from 'src/shared/constants';
import { GetPresignedUrlDto } from './dto/get-presigned-url.dto';
import { FilesService } from 'src/shared/file.service';
import { response } from 'src/shared/response.util';

@Injectable()
export class FormValueService {
  private readonly logger = new Logger('FormService');
  constructor(
    @InjectModel(FormValue.name)
    private readonly formValueModel: Model<FormValue>,
    private fileService: FilesService,
  ) {}
  async create(createFormValueDto: CreateFormValueDto) {
    try {
      const formValueField = new this.formValueModel();
      formValueField.form_id = new Types.ObjectId(createFormValueDto?.form_id);
      formValueField.step_id = new Types.ObjectId(createFormValueDto?.step_id);
      formValueField.fieldValueArray = createFormValueDto?.fieldValueArray;

      if (createFormValueDto?.fieldValueArray.length > 0) {
        formValueField.fieldValueArray.forEach((item, index) => {
          formValueField.fieldValueArray[index].field_array_id = new Types.ObjectId(item?.field_array_id);
          formValueField.fieldValueArray[index].fieldValue = item?.fieldValue;
        });
      }
      if (createFormValueDto?.logo) {
        try {
          const url = new URL(createFormValueDto.logo); // Your URL here
          formValueField.logo = url.pathname;
        } catch (err) {
          this.logger.log(err);
        }
      }

      const result = await formValueField.save();
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const result = await this.formValueModel.find().exec();
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async getPresignUrlForMediaUpload(getPresignedUrlDto: GetPresignedUrlDto) {
    try {
      const url = await this.fileService.generateUploadCommonPresingImageUrl('customform', getPresignedUrlDto);
      let accessUrl = url;
      try {
        const urlTrim = new URL(url); // Your URL here
        accessUrl = urlTrim.pathname;
        accessUrl = `${process.env.AWS_CLOUDFRONT_URL}${accessUrl}`;
      } catch (err) {
        this.logger.log(err);
      }
      return response(HttpStatus.OK, Constants.ResponseMessages.SUCCESS, {
        url,
        accessUrl,
      });
    } catch (err) {
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}

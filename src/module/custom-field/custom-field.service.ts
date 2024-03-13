import { BadRequestException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomField } from './schemas/custom-field.schema';
import { Constants, SortTypeMongo } from 'src/shared/constants';
import { ResponseBuilder } from 'src/shared/responseBuilder';
import { GetCustomFieldDto } from './dto/get-custom-field.dto';
import { response } from 'src/shared/response.util';

@Injectable()
export class CustomFieldService {
  private readonly logger = new Logger('CustomFieldService');
  constructor(
    @InjectModel(CustomField.name)
    private readonly customFieldModel: Model<CustomField>,
  ) {}

  async create(createCustomFieldDto: CreateCustomFieldDto) {
    try {
      const isCustomField = await this.customFieldModel.findOne({
        name: createCustomFieldDto.name,
      });
      if (isCustomField) {
        return ResponseBuilder.errorMessage(Constants.ResponseMessages.CUSTOM_FIELD_ALREADY_EXIST);
      }
      const customField = new this.customFieldModel();
      // Set values from the DTO to the entity
      customField.name = createCustomFieldDto?.name;
      customField.isSearch = createCustomFieldDto?.isSearch;
      customField.isActive = createCustomFieldDto?.isActive;
      customField.formControlName = createCustomFieldDto?.formControlName;
      customField.options = createCustomFieldDto?.options;
      customField.optionsType = createCustomFieldDto?.optionsType;
      customField.isDynamic = createCustomFieldDto?.isDynamic;
      customField.isActive = createCustomFieldDto?.isActive || true;
      customField.isRequired = createCustomFieldDto?.isRequired;

      // Handle ObjectId fields
      customField.field_id = createCustomFieldDto.field_id ? new Types.ObjectId(createCustomFieldDto.field_id) : null;
      customField.reference_id = createCustomFieldDto.reference_id
        ? new Types.ObjectId(createCustomFieldDto.reference_id)
        : null;
      customField.dependentOn_id = createCustomFieldDto.dependentOn_id
        ? new Types.ObjectId(createCustomFieldDto.dependentOn_id)
        : null;

      const result = await customField.save();
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async getFieldList() {
    try {
      const fieldList = await this.customFieldModel.find({ isActive: true }).lean();
      return ResponseBuilder.data(fieldList, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(getCustomFieldDto: GetCustomFieldDto) {
    try {
      const page = +getCustomFieldDto.page || 1;
      const limit = +getCustomFieldDto.limit || 10;
      const skip = (page - 1) * limit;
      const sortBy = getCustomFieldDto.sort == SortTypeMongo.asc ? 1 : -1;
      const sort = {
        created_at: sortBy,
      };
      const pipeline = [];
      const matchFormCondition = {
        isActive: getCustomFieldDto.isActive === 'true' ? true : false,
      };
      if (getCustomFieldDto.isActive === 'true') {
        pipeline.push({
          $match: matchFormCondition,
        });
      }
      if (getCustomFieldDto.skip_pagination == 'true') {
        pipeline.push(
          {
            $lookup: {
              from: 'inputfields',
              localField: 'field_id',
              foreignField: '_id',
              as: 'fields',
            },
          },
          {
            $unwind: '$fields', // Split the "fields" array into separate documents
          },
          {
            $lookup: {
              from: 'referencelists',
              localField: 'reference_id',
              foreignField: '_id',
              as: 'referenceType',
            },
          },
          {
            $unwind: {
              path: '$referenceType',
              preserveNullAndEmptyArrays: true, // Preserve null or empty arrays
            },
          },
          {
            $lookup: {
              from: 'referencelists',
              localField: 'dependentOn_id',
              foreignField: '_id',
              as: 'dependentOn',
            },
          },
          {
            $unwind: {
              path: '$dependentOn',
              preserveNullAndEmptyArrays: true, // Preserve null or empty arrays
            },
          },
          {
            $project: {
              _id: 1,
              isRequired: 1,
              isSearch: 1,
              options: 1,
              optionsType: 1,
              name: 1,
              formControlName: 1,
              field_id: 1,
              reference_id: 1,
              dependentOn_id: 1,
              isActive: 1,
              isFixed: 1,
              fieldName: '$fields.fieldName',
              referenceType: '$referenceType.name',
              dependentOn: '$dependentOn.name',
            },
          },
        );
        const result = await this.customFieldModel.aggregate(pipeline);
        const totalCount = await this.customFieldModel.countDocuments(pipeline).exec();

        return response(HttpStatus.OK, Constants.ResponseMessages.SUCCESS, {
          result: result,
          totalCount: totalCount,
          page,
          limit,
        });
      } else {
        pipeline.push(
          {
            $lookup: {
              from: 'inputfields',
              localField: 'field_id',
              foreignField: '_id',
              as: 'fields',
            },
          },
          {
            $unwind: '$fields', // Split the "fields" array into separate documents
          },
          {
            $lookup: {
              from: 'referencelists',
              localField: 'reference_id',
              foreignField: '_id',
              as: 'referenceType',
            },
          },
          {
            $unwind: {
              path: '$referenceType',
              preserveNullAndEmptyArrays: true, // Preserve null or empty arrays
            },
          },
          {
            $lookup: {
              from: 'referencelists',
              localField: 'dependentOn_id',
              foreignField: '_id',
              as: 'dependentOn',
            },
          },
          {
            $unwind: {
              path: '$dependentOn',
              preserveNullAndEmptyArrays: true, // Preserve null or empty arrays
            },
          },
          {
            $project: {
              _id: 1,
              isRequired: 1,
              isSearch: 1,
              options: 1,
              name: 1,
              formControlName: 1,
              field_id: 1,
              reference_id: 1,
              dependentOn_id: 1,
              isActive: 1,
              fieldName: '$fields.fieldName',
              referenceType: '$referenceType.name',
              dependentOn: '$dependentOn.name',
            },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
          {
            $sort: sort,
          },
        );
        const result = await this.customFieldModel.aggregate(pipeline);
        const totalCount = await this.customFieldModel.countDocuments(pipeline).exec();

        return response(HttpStatus.OK, Constants.ResponseMessages.SUCCESS, {
          result: result,
          totalCount: totalCount,
          page,
          limit,
        });
      }
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async changeStatus(data: any) {
    try {
      const id = data.id;
      const result = await this.customFieldModel.findById({
        _id: new Types.ObjectId(id),
      });
      if (result) {
        result.isActive = !result.isActive;
        await this.customFieldModel.create(result);
        return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
      }
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}

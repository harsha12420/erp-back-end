import { BadRequestException, ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Form } from './schemas/form.schema';
import { Model, Types } from 'mongoose';
import { ResponseBuilder } from 'src/shared/responseBuilder';
import { Constants, SortTypeMongo } from 'src/shared/constants';
import { GetFormDto } from './dto/get-form.dto';
import { GetFieldDto } from './dto/get-field.dto';
import { CustomField } from '../custom-field/schemas/custom-field.schema';
import { REQUEST } from '@nestjs/core';
import { UpdateSequenceDto } from './dto/update-sequence.dto';
import { FormList } from '../form-list/schemas/form-list.schema';
import { StepList } from '../step-list/schemas/step-list.schema';

@Injectable()
export class FormService {
  private readonly logger = new Logger('FormService');
  constructor(
    @InjectModel(Form.name) private readonly formModel: Model<Form>,

    @InjectModel(CustomField.name)
    private readonly customFieldModel: Model<CustomField>,
    @InjectModel(FormList.name)
    private readonly formListModel: Model<FormList>,
    @InjectModel(StepList.name)
    private readonly stepListModel: Model<StepList>,
    @Inject(REQUEST) private readonly request,
  ) {}

  async create(createFormDto: CreateFormDto) {
    try {
      if (!this.request.user.school_id) {
        throw new ConflictException(Constants.ResponseMessages.PERMISSION_DENIED);
      }

      //Edit Form
      if (createFormDto?.id) {
        const isExist = await this.formModel.findOne({
          _id: new Types.ObjectId(createFormDto?.id),
          school_id: this.request.user.school_id,
        });
        if (isExist) {
          (isExist.form_id = createFormDto?.form_id ? new Types.ObjectId(createFormDto?.form_id) : null),
            (isExist.step_id = createFormDto?.step_id ? new Types.ObjectId(createFormDto?.step_id) : null),
            (isExist.group_id = createFormDto?.group_id ? new Types.ObjectId(createFormDto?.group_id) : null),
            (isExist.fields_array = createFormDto?.fields_array);
          isExist.isMultiple = createFormDto?.isMultiple;

          if (createFormDto?.fields_array.length > 0) {
            createFormDto.fields_array.forEach(async (item, index) => {
              if (item?._id) {
                const isArrayExist = await this.formModel.findOne({
                  'fields_array._id': new Types.ObjectId(item?._id),
                });
                isArrayExist.fields_array[index].field_id = new Types.ObjectId(item?.field_id);
                isArrayExist.fields_array[index].isRequired = item?.isRequired;
                isArrayExist.fields_array[index].fieldName = item?.fieldName;
                isArrayExist.fields_array[index].name = item?.name;
                isArrayExist.fields_array[index].formControlName = item?.formControlName;
                isArrayExist.fields_array[index].isFixed = item?.isFixed;
                isArrayExist.fields_array[index].isListView = item?.isListView;
                isArrayExist.fields_array[index].options = item?.options;
                isArrayExist.fields_array[index].optionsType = item?.optionsType;
                isArrayExist.fields_array[index].isSearch = item?.isSearch;
                isArrayExist.fields_array[index].reference_id = item?.reference_id
                  ? new Types.ObjectId(item?.reference_id)
                  : null;
                isArrayExist.fields_array[index].dependentOn_id = item?.dependentOn_id
                  ? new Types.ObjectId(item?.dependentOn_id)
                  : null;

                isArrayExist.save();
              }

              isExist.fields_array[index].field_id = new Types.ObjectId(item?.field_id);
              isExist.fields_array[index].isRequired = item?.isRequired;
              isExist.fields_array[index].fieldName = item?.fieldName;
              isExist.fields_array[index].name = item?.name;
              isExist.fields_array[index].formControlName = item?.formControlName;
              isExist.fields_array[index].isFixed = item?.isFixed;
              isExist.fields_array[index].isListView = item?.isListView;
              isExist.fields_array[index].options = item?.options;
              isExist.fields_array[index].optionsType = item?.optionsType;
              isExist.fields_array[index].isSearch = item?.isSearch;
              isExist.fields_array[index].reference_id = item?.reference_id
                ? new Types.ObjectId(item?.reference_id)
                : null;
              isExist.fields_array[index].dependentOn_id = item?.dependentOn_id
                ? new Types.ObjectId(item?.dependentOn_id)
                : null;
            });
          }
          isExist.save();
          return ResponseBuilder.data({}, Constants.ResponseMessages.SUCCESS);
        } else {
          return ResponseBuilder.badRequest(Constants.ResponseMessages.DATA_NOT_FOUND);
        }
        // save form
      }

      // Check if form with step exists
      if (createFormDto?.step_id) {
        await this.handleFormWithStep(createFormDto);
      } else {
        await this.handleFormWithoutStep(createFormDto);
      }

      return ResponseBuilder.data({}, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async handleFormWithStep(createFormDto: CreateFormDto) {
    const isFormWithStep = await this.formModel.find({
      form_id: new Types.ObjectId(createFormDto?.form_id),
      step_id: new Types.ObjectId(createFormDto?.step_id),
      school_id: this.request.user.school_id,
    });

    const isForm = await this.formModel.find({
      form_id: new Types.ObjectId(createFormDto?.form_id),
    });

    if (isForm.length > 0) {
      await this.checkForDuplicatesAndDeleteFormsSteps(isForm, isFormWithStep, createFormDto);
    }

    const formField = new this.formModel({
      form_id: new Types.ObjectId(createFormDto?.form_id),
      step_id: createFormDto?.step_id ? new Types.ObjectId(createFormDto?.step_id) : null,
      group_id: createFormDto?.group_id ? new Types.ObjectId(createFormDto?.group_id) : null,
      isMultiple: createFormDto?.isMultiple,
      school_id: this.request.user.school_id,
      fields_array: createFormDto?.fields_array.map((item) => ({
        field_id: new Types.ObjectId(item?.field_id),
        isRequired: item?.isRequired,
        fieldName: item?.fieldName,
        name: item?.name,
        formControlName: item?.formControlName,
        isFixed: item?.isFixed,
        isListView: item?.isListView,
        options: item?.options,
        optionsType: item?.optionsType,
        isSearch: item?.isSearch,
        reference_id: item?.reference_id ? new Types.ObjectId(item?.reference_id) : null,
        dependentOn_id: item?.dependentOn_id ? new Types.ObjectId(item?.dependentOn_id) : null,
      })),
    });

    await formField.save();
  }

  async handleFormWithoutStep(createFormDto: CreateFormDto) {
    const isForm = await this.formModel.find({
      form_id: new Types.ObjectId(createFormDto?.form_id),
      school_id: this.request.user.school_id,
    });

    if (isForm.length > 0) {
      await this.checkForDuplicatesAndDeleteForms(isForm, createFormDto);
    }

    const formField = new this.formModel({
      form_id: new Types.ObjectId(createFormDto?.form_id),
      step_id: createFormDto?.step_id ? new Types.ObjectId(createFormDto?.step_id) : null,
      group_id: createFormDto?.group_id ? new Types.ObjectId(createFormDto?.group_id) : null,
      isMultiple: createFormDto?.isMultiple,
      school_id: this.request.user.school_id,
      fields_array: createFormDto?.fields_array.map((item) => ({
        field_id: new Types.ObjectId(item?.field_id),
        isRequired: item?.isRequired,
        fieldName: item?.fieldName,
        name: item?.name,
        formControlName: item?.formControlName,
        isFixed: item?.isFixed,
        isListView: item?.isListView,
        options: item?.options,
        optionsType: item?.optionsType,
        isSearch: item?.isSearch,
        reference_id: item?.reference_id ? new Types.ObjectId(item?.reference_id) : null,
        dependentOn_id: item?.dependentOn_id ? new Types.ObjectId(item?.dependentOn_id) : null,
      })),
    });

    await formField.save();
  }

  async checkForDuplicatesAndDeleteForms(isForm: any[], createFormDto: CreateFormDto) {
    const arrayofData = isForm.map((form) => form.fields_array);

    const flattenedArray = arrayofData.reduce((result, innerArray) => result.concat(innerArray), []);

    const valuesToCheck = createFormDto.fields_array.map((form) => form.name);
    const arrayToSearch = flattenedArray.map((form) => form.name);
    const uniqueValues = [...new Set(valuesToCheck)];
    const uniqueValues1 = [...new Set(arrayToSearch)];

    const isDuplicate = uniqueValues.every((value) => uniqueValues1.includes(value));

    if (isDuplicate) {
      throw new BadRequestException(Constants.ResponseMessages.FIELD_ALREADY_EXIST);
    }

    // Delete forms with step if exists
    if (createFormDto?.step_id) {
      for (const item of isForm) {
        if (item.step_id === null) {
          await this.formModel.deleteMany({
            form_id: new Types.ObjectId(createFormDto?.form_id),
          });
        }
      }
    }
  }

  async checkForDuplicatesAndDeleteFormsSteps(isForm: any[], isFormWithStep: any[], createFormDto: CreateFormDto) {
    const arrayofData = isFormWithStep.map((form) => form.fields_array);

    const flattenedArray = arrayofData.reduce((result, innerArray) => result.concat(innerArray), []);

    const valuesToCheck = createFormDto.fields_array.map((form) => form.name);
    const arrayToSearch = flattenedArray.map((form) => form.name);
    const uniqueValues = [...new Set(valuesToCheck)];
    const uniqueValues1 = [...new Set(arrayToSearch)];

    const isDuplicate = uniqueValues.every((value) => uniqueValues1.includes(value));

    if (isDuplicate) {
      throw new BadRequestException(Constants.ResponseMessages.FIELD_ALREADY_EXIST);
    }

    // Delete forms with step if exists
    if (createFormDto?.step_id) {
      for (const item of isForm) {
        if (item.step_id === null) {
          await this.formModel.deleteMany({
            form_id: new Types.ObjectId(createFormDto?.form_id),
          });
        }
      }
    }
  }

  async getFields(getFieldDto: GetFieldDto) {
    try {
      const sortBy = getFieldDto.sort == SortTypeMongo.asc ? 1 : -1;
      const sort = {
        'fields_array.sequence': sortBy,
      };

      const pipeline = [];
      // Define the match condition
      const matchFormCondition = {
        form_id: new Types.ObjectId(getFieldDto.form_id),
      };
      const matchStepCondition = {
        step_id: new Types.ObjectId(getFieldDto.step_id),
      };
      const matchGroupCondition = {
        group_id: new Types.ObjectId(getFieldDto.group_id),
      };
      // Add the match stage conditionally
      if (getFieldDto.form_id) {
        pipeline.push({
          $match: matchFormCondition,
        });
      }
      if (getFieldDto.step_id) {
        pipeline.push({
          $match: matchStepCondition,
        });
      }
      if (getFieldDto.group_id) {
        pipeline.push({
          $match: matchGroupCondition,
        });
      }
      // pipeline.push({
      //   $match: { school_id: this.request.user.school_id },
      // });
      pipeline.push(
        {
          $unwind: '$fields_array',
        },
        {
          $sort: {
            'fields_array.sequence': -1,
          },
        },
        {
          $group: {
            _id: '$_id',
            isMultiple: { $first: '$isMultiple' },
            fields_array: { $push: '$fields_array' },
          },
        },
      );
      let customFieldResult;
      const result = await this.formModel.aggregate(pipeline);
      if (getFieldDto?.form_id) {
        const formResult = await this.formListModel.findOne({ _id: getFieldDto?.form_id });
        if (getFieldDto?.step_id) {
          const stepResult = await this.stepListModel.findOne({ _id: getFieldDto?.step_id });
          if (stepResult?.sequence === 1) {
            customFieldResult = await this.customFieldModel.find({ formType: formResult?.formType });
          }
        } else {
          customFieldResult = await this.customFieldModel.find({ formType: formResult?.formType });
        }
      }

      if (result.length > 0) {
        let combinedArray = [];
        result.forEach((item, i) => {
          if (item.fields_array) {
            combinedArray = [...combinedArray, ...item.fields_array];
          }
        });
        combinedArray.sort((a, b) => a.sequence - b.sequence);
      }
      // result.length > 0
      //   ? (result[0].customFieldArray = customFieldResult?.length > 0 ? customFieldResult : [])
      //   : result;
      return ResponseBuilder.data(
        { result: result, customFieldArray: customFieldResult?.length > 0 ? customFieldResult : [] },
        Constants.ResponseMessages.SUCCESS,
      );
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async getDataBySequence(getFieldDto: GetFieldDto) {
    try {
      const sortBy = getFieldDto.sort == SortTypeMongo.asc ? 1 : -1;
      const sort = {
        'fields_array.sequence': sortBy,
      };
      const pipeline = [];
      // Define the match condition
      const matchFormCondition = {
        form_id: new Types.ObjectId(getFieldDto.form_id),
      };
      const matchStepCondition = {
        step_id: new Types.ObjectId(getFieldDto.step_id),
      };
      const matchGroupCondition = {
        group_id: new Types.ObjectId(getFieldDto.group_id),
      };

      // Add the match stage conditionally
      if (getFieldDto.form_id) {
        pipeline.push({
          $match: matchFormCondition,
        });
      }
      if (getFieldDto.step_id) {
        pipeline.push({
          $match: matchStepCondition,
        });
      }
      if (getFieldDto.group_id) {
        pipeline.push({
          $match: matchGroupCondition,
        });
      }
      pipeline.push({
        $match: { school_id: this.request.user.school_id },
      });
      pipeline.push(
        {
          $unwind: '$fields_array',
        },
        {
          $sort: {
            'fields_array.sequence': -1,
          },
        },
        {
          $group: {
            _id: '$_id',
            form_id: { $first: '$form_id' },
            step_id: { $first: '$step_id' },
            isMultiple: { $first: '$isMultiple' },
            fields_array: { $push: '$fields_array' },
          },
        },
      );
      let result = await this.formModel.aggregate(pipeline);
      if (result.length > 0) {
        let combinedArray = [];
        result.forEach((item) => {
          if (getFieldDto.form_id && !getFieldDto.step_id && !getFieldDto.group_id) {
            if (item.step_id === null) {
              if (item.fields_array) {
                combinedArray = [...combinedArray, ...item.fields_array];
              }
            }
          } else if (getFieldDto.form_id && getFieldDto.step_id && !getFieldDto.group_id) {
            if (item.step_id !== null) {
              if (item.fields_array) {
                combinedArray = [...combinedArray, ...item.fields_array];
              }
            }
          } else if (getFieldDto.form_id && getFieldDto.step_id && getFieldDto.group_id) {
            if (item.group_id !== null) {
              if (item.fields_array) {
                combinedArray = [...combinedArray, ...item.fields_array];
              }
            }
          }
        });
        combinedArray.sort((a, b) => a.sequence - b.sequence);
        console.log(combinedArray);
        result = combinedArray;
      }
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }

  async combineMultipleArrays(arrays) {
    let combinedArray = [];

    for (let i = 0; i < arrays.length; i++) {
      combinedArray = [...combinedArray, ...arrays[i]];
    }

    return combinedArray;
  }

  async findAll(getFormDto: GetFormDto) {
    try {
      const pipeline = [];
      // Define the match condition
      const matchFormCondition = {
        form_id: new Types.ObjectId(getFormDto.form_id),
      };
      const matchStepCondition = {
        step_id: new Types.ObjectId(getFormDto.step_id),
      };
      const matchGroupCondition = {
        group_id: new Types.ObjectId(getFormDto.group_id),
      };

      // Add the match stage conditionally
      if (getFormDto.form_id) {
        pipeline.push({
          $match: matchFormCondition,
        });
      }
      if (getFormDto.step_id) {
        pipeline.push({
          $match: matchStepCondition,
        });
      }
      if (getFormDto.group_id) {
        pipeline.push({
          $match: matchGroupCondition,
        });
      }
      pipeline.push({
        $match: { school_id: this.request.user.school_id },
      });
      pipeline.push(
        {
          $sort: { 'steps.sequence': -1 },
        },
        {
          $lookup: {
            from: 'formlists',
            localField: 'form_id',
            foreignField: '_id',
            as: 'forms',
          },
        },
        {
          $unwind: {
            path: '$forms',
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
          $lookup: {
            from: 'grouplists',
            localField: 'group_id',
            foreignField: '_id',
            as: 'groups',
          },
        },
        {
          $unwind: {
            path: '$groups',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'referencelists',
            localField: 'fields_array.reference_id',
            foreignField: '_id',
            as: 'referenceData',
          },
        },
        {
          $lookup: {
            from: 'referencelists',
            localField: 'fields_array.dependentOn_id',
            foreignField: '_id',
            as: 'dependentOnData',
          },
        },
        {
          $addFields: {
            fields_array: {
              $map: {
                input: '$fields_array',
                as: 'field',
                in: {
                  $mergeObjects: [
                    '$$field',
                    {
                      referenceData: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$referenceData',
                              as: 'refData',
                              cond: {
                                $eq: ['$$refData._id', '$$field.reference_id'],
                              },
                            },
                          },
                          0,
                        ],
                      },
                      dependentOnData: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$dependentOnData',
                              as: 'depData',
                              cond: {
                                $eq: ['$$depData._id', '$$field.dependentOn_id'],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $group: {
            _id: {
              formId: '$forms._id',
              formName: '$forms.formName',
              stepId: '$steps._id',
              stepName: '$steps.stepName',
              stepSequence: '$steps.sequence',
              groupId: '$groups._id',
              groupName: '$groups.groupName',
            },
            isMultiple: { $first: '$isMultiple' }, // Include isMultiple
            groupFields: {
              $push: {
                fieldName: '$fields_array',
              },
            },
          },
        },
        {
          $group: {
            _id: {
              formId: '$_id.formId',
              formName: '$_id.formName',
              stepName: '$_id.stepName',
              stepId: '$_id.stepId',
              stepSequence: '$_id.stepSequence',
            },
            groups: {
              $push: {
                groupId: '$_id.groupId',
                groupName: '$_id.groupName',
                isMultiple: '$isMultiple', // Include isMultiple
                groupFields: '$groupFields',
              },
            },
            isMultiple: { $first: '$isMultiple' }, // Include isMultiple
          },
        },
        {
          $project: {
            _id: 0,
            forms: {
              formId: '$_id.formId',
              formName: '$_id.formName',
              stepName: '$_id.stepName',
              stepId: '$_id.stepId',
              stepSequence: '$_id.stepSequence',
              groups: '$groups',
            },
          },
        },
      );
      const result = await this.formModel.aggregate(pipeline);
      if (result?.length > 0) {
        result.sort((a, b) => a.forms.stepSequence - b.forms.stepSequence);
      }
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
            'fields_array._id': new Types.ObjectId(sequenceId.id),
          },
          update: {
            $set: {
              'fields_array.$.sequence': sequenceId.sequence,
            },
          },
        },
      }));
      const result = await this.formModel.bulkWrite(bulkUpdateOperations);
      return ResponseBuilder.data({ result }, Constants.ResponseMessages.SUCCESS);
    } catch (error) {
      this.logger.log(error);
      throw new BadRequestException(Constants.ResponseMessages.INTERNAL_SERVER_ERROR);
    }
  }
}

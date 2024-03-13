import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomField } from './schemas/custom-field.schema';

const formType = {
  enquiry: 'enquiry',
  admission: 'admission',
  staffprofile: 'staffprofile',
  studentprofile: 'studentprofile',
};
@Injectable()
export class CustomFieldSeeder {
  constructor(@InjectModel(CustomField.name) private readonly customFieldModel: Model<CustomField>) {}

  async seed() {
    // Seed data for custom_field collection
    const customFieldsData = [
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Medium',
        formControlName: 'medium_id',
        field_id: new Types.ObjectId('6541f94049a9a9dd886bb921'),
        isFixed: true,
        reference_id: new Types.ObjectId('655b2727a6f80b3aab7f889d'),
        formType: [formType.enquiry, formType.studentprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'First Name',
        formControlName: 'first_name',
        field_id: new Types.ObjectId('6541f1c53704c86e8d0b07d9'),
        isFixed: true,
        formType: [formType.enquiry, formType.staffprofile, formType.studentprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Last Name',
        formControlName: 'last_name',
        field_id: new Types.ObjectId('6541f1c53704c86e8d0b07d9'),
        isFixed: true,
        formType: [formType.enquiry, formType.staffprofile, formType.studentprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Middle Name',
        formControlName: 'middle_name',
        field_id: new Types.ObjectId('6541f1c53704c86e8d0b07d9'),
        isFixed: true,
        formType: [formType.enquiry, formType.studentprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Whatsapp No',
        formControlName: 'whatsapp_no',
        field_id: new Types.ObjectId('6541f1bd3704c86e8d0b07d6'),
        isFixed: true,
        formType: [formType.enquiry, formType.staffprofile, formType.studentprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Parent Email Id',
        formControlName: 'parent_email',
        field_id: new Types.ObjectId('6541f1e43704c86e8d0b07e8'),
        isFixed: true,
        formType: [formType.enquiry],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Date of Birth',
        formControlName: 'date_of_birth',
        field_id: new Types.ObjectId('6541f1f43704c86e8d0b07ee'),
        isFixed: true,
        formType: [formType.enquiry, formType.staffprofile, formType.studentprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Academic Year',
        formControlName: 'academic_year_id',
        field_id: new Types.ObjectId('6541f94049a9a9dd886bb921'),
        reference_id: new Types.ObjectId('655b2744a6f80b3aab7f88a0'),
        isFixed: true,
        formType: [formType.enquiry],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Standard',
        formControlName: 'standard_id',
        field_id: new Types.ObjectId('6541f94049a9a9dd886bb921'),
        isFixed: true,
        reference_id: new Types.ObjectId('655b2751a6f80b3aab7f88a3'),
        dependentOn_id: new Types.ObjectId('655b2727a6f80b3aab7f889d'),
        formType: [formType.enquiry, formType.studentprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Mobile Number',
        formControlName: 'mobile_number',
        field_id: new Types.ObjectId('6541f1bd3704c86e8d0b07d6'),
        isFixed: true,
        formType: [formType.staffprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Personal Email',
        formControlName: 'personal_email',
        field_id: new Types.ObjectId('6541f1e43704c86e8d0b07e8'),
        isFixed: true,
        formType: [formType.staffprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Office Email',
        formControlName: 'office_email',
        field_id: new Types.ObjectId('6541f1e43704c86e8d0b07e8'),
        isFixed: true,
        formType: [formType.staffprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Password',
        formControlName: 'password',
        field_id: new Types.ObjectId('6541f1eb3704c86e8d0b07eb'),
        isFixed: true,
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Primary Role',
        formControlName: 'primary_role,',
        field_id: new Types.ObjectId('6541f94049a9a9dd886bb921'),
        isFixed: true,
        reference_id: new Types.ObjectId('6565b7a48bf4237851f498a2'),
        formType: [formType.staffprofile],
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Secondary Role',
        formControlName: 'secondary_role,',
        field_id: new Types.ObjectId('6541f94049a9a9dd886bb921'),
        isFixed: true,
        reference_id: new Types.ObjectId('6565b7a48bf4237851f498a2'),
        formType: [formType.staffprofile],
        optionsType: 'multiple',
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Subject',
        formControlName: 'subject',
        field_id: new Types.ObjectId('6541f94049a9a9dd886bb921'),
        isFixed: true,
        reference_id: new Types.ObjectId('6565b7751334cf3258dcabc8'),
        dependentOn_id: new Types.ObjectId('655b2751a6f80b3aab7f88a3'),
      },
      {
        isSearch: true,
        isRequired: true,
        isActive: true,
        name: 'Date of Joining',
        formControlName: 'date_of_joining',
        field_id: new Types.ObjectId('6541f1f43704c86e8d0b07ee'),
        isFixed: true,
        formType: [formType.staffprofile],
      },
      // Add more entries as needed
    ];

    // await this.customFieldModel.insertMany(customFieldsData);
    const existingNames = await this.customFieldModel.distinct('name', {
      name: { $in: customFieldsData.map((entry) => entry.name) },
    });
    const newDataToInsert = customFieldsData.filter((entry) => !existingNames.includes(entry.name));
    if (newDataToInsert.length > 0) {
      await this.customFieldModel.insertMany(newDataToInsert);
      console.log('Data inserted successfully.');
    } else {
      console.log('No new data to insert.');
    }
  }
}

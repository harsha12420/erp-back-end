import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReferenceList } from './schemas/reference-list.schema';

@Injectable()
export class ReferenceFieldSeeder {
  constructor(@InjectModel(ReferenceList.name) private readonly referenceFieldModel: Model<ReferenceList>) {}

  async seed() {
    // Seed data for custom_field collection
    const referenceFieldsData = [
      {
        _id: '65423bbf592e1a74115c2ac3',
        name: 'Pincode',
        isActive: true,
      },
      {
        _id: '65423bc5592e1a74115c2ac6',
        name: 'Village',
        isActive: true,
      },
      {
        _id: '65423bcf592e1a74115c2ac9',
        name: 'Sub-district',
        isActive: true,
      },
      {
        _id: '65423bd6592e1a74115c2acc',
        name: 'District',
        isActive: true,
      },
      {
        _id: '65423be1592e1a74115c2acf',
        name: 'State',
        isActive: true,
      },
      {
        _id: '655b2727a6f80b3aab7f889d',
        name: 'Medium',
        isActive: true,
      },
      {
        _id: '655b2744a6f80b3aab7f88a0',
        name: 'Academic year',
        isActive: true,
      },
      {
        _id: '655b2751a6f80b3aab7f88a3',
        name: 'Standard',
        isActive: true,
      },
      {
        _id: '6565b7751334cf3258dcabc8',
        name: 'Subject',
        isActive: true,
      },
      {
        _id: '6565b7a48bf4237851f498a2',
        name: 'Role',
        isActive: true,
      },
      {
        _id: '6566bb8a8851001652412a5d',
        name: 'Staff-Room',
        isActive: true,
      },
      {
        _id: '65685b3bb15eb5e95567d310',
        name: 'Source of information',
      },
      // Add more entries as needed
    ];

    const existingNames = await this.referenceFieldModel.distinct('name', {
      name: { $in: referenceFieldsData.map((entry) => entry.name) },
    });
    const newDataToInsert = referenceFieldsData.filter((entry) => !existingNames.includes(entry.name));
    if (newDataToInsert.length > 0) {
      await this.referenceFieldModel.insertMany(newDataToInsert);
      console.log('Data inserted successfully.');
    } else {
      console.log('No new data to insert.');
    }
  }
}

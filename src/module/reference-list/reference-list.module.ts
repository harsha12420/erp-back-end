import { Module } from '@nestjs/common';
import { ReferenceListService } from './reference-list.service';
import { ReferenceListController } from './reference-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferenceList, ReferenceListSchema } from './schemas/reference-list.schema';
import { ReferenceFieldSeeder } from './reference-field.seeder';

@Module({
  imports: [MongooseModule.forFeature([{ name: ReferenceList.name, schema: ReferenceListSchema }])],
  controllers: [ReferenceListController],
  providers: [ReferenceListService, ReferenceFieldSeeder],
})
export class ReferenceListModule {}

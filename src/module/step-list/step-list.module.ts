import { Module } from '@nestjs/common';
import { StepListService } from './step-list.service';
import { StepListController } from './step-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StepList, StepListSchema } from './schemas/step-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StepList.name, schema: StepListSchema },
    ]),
  ],
  controllers: [StepListController],
  providers: [StepListService],
})
export class StepListModule {}

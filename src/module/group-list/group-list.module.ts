import { Module } from '@nestjs/common';
import { GroupListService } from './group-list.service';
import { GroupListController } from './group-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupList, GroupListSchema } from './schemas/group-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GroupList.name, schema: GroupListSchema },
    ]),
  ],
  controllers: [GroupListController],
  providers: [GroupListService],
})
export class GroupListModule {}

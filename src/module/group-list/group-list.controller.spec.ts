import { Test, TestingModule } from '@nestjs/testing';
import { GroupListController } from './group-list.controller';
import { GroupListService } from './group-list.service';

describe('GroupListController', () => {
  let controller: GroupListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupListController],
      providers: [GroupListService],
    }).compile();

    controller = module.get<GroupListController>(GroupListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

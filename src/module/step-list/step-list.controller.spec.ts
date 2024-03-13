import { Test, TestingModule } from '@nestjs/testing';
import { StepListController } from './step-list.controller';
import { StepListService } from './step-list.service';

describe('StepListController', () => {
  let controller: StepListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepListController],
      providers: [StepListService],
    }).compile();

    controller = module.get<StepListController>(StepListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

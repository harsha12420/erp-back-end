import { Test, TestingModule } from '@nestjs/testing';
import { FormListController } from './form-list.controller';
import { FormListService } from './form-list.service';

describe('FormListController', () => {
  let controller: FormListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormListController],
      providers: [FormListService],
    }).compile();

    controller = module.get<FormListController>(FormListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

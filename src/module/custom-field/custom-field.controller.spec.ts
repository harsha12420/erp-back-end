import { Test, TestingModule } from '@nestjs/testing';
import { CustomFieldController } from './custom-field.controller';
import { CustomFieldService } from './custom-field.service';

describe('CustomFieldController', () => {
  let controller: CustomFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomFieldController],
      providers: [CustomFieldService],
    }).compile();

    controller = module.get<CustomFieldController>(CustomFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

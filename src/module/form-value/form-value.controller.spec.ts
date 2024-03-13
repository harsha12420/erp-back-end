import { Test, TestingModule } from '@nestjs/testing';
import { FormValueController } from './form-value.controller';
import { FormValueService } from './form-value.service';

describe('FormValueController', () => {
  let controller: FormValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormValueController],
      providers: [FormValueService],
    }).compile();

    controller = module.get<FormValueController>(FormValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { InputFieldController } from './input-field.controller';
import { InputFieldService } from './input-field.service';

describe('InputFieldController', () => {
  let controller: InputFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InputFieldController],
      providers: [InputFieldService],
    }).compile();

    controller = module.get<InputFieldController>(InputFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

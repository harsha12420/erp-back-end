import { Test, TestingModule } from '@nestjs/testing';
import { InputFieldService } from './input-field.service';

describe('InputFieldService', () => {
  let service: InputFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InputFieldService],
    }).compile();

    service = module.get<InputFieldService>(InputFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

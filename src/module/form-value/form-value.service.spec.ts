import { Test, TestingModule } from '@nestjs/testing';
import { FormValueService } from './form-value.service';

describe('FormValueService', () => {
  let service: FormValueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormValueService],
    }).compile();

    service = module.get<FormValueService>(FormValueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

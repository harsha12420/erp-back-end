import { Test, TestingModule } from '@nestjs/testing';
import { FormListService } from './form-list.service';

describe('FormListService', () => {
  let service: FormListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormListService],
    }).compile();

    service = module.get<FormListService>(FormListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

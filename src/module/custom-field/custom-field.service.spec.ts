import { Test, TestingModule } from '@nestjs/testing';
import { CustomFieldService } from './custom-field.service';

describe('CustomFieldService', () => {
  let service: CustomFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomFieldService],
    }).compile();

    service = module.get<CustomFieldService>(CustomFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StepListService } from './step-list.service';

describe('StepListService', () => {
  let service: StepListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StepListService],
    }).compile();

    service = module.get<StepListService>(StepListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

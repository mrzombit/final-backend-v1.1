import { Test, TestingModule } from '@nestjs/testing';
import { BusinessGoalService } from './business-goal.service';

describe('BusinessGoalService', () => {
  let service: BusinessGoalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessGoalService],
    }).compile();

    service = module.get<BusinessGoalService>(BusinessGoalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

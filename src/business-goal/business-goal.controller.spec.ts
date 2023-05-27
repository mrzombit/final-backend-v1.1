import { Test, TestingModule } from '@nestjs/testing';
import { BusinessGoalController } from './business-goal.controller';

describe('BusinessGoalController', () => {
  let controller: BusinessGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessGoalController],
    }).compile();

    controller = module.get<BusinessGoalController>(BusinessGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

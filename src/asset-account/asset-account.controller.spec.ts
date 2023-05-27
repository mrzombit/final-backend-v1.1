import { Test, TestingModule } from '@nestjs/testing';
import { AssetAccountController } from './asset-account.controller';

describe('AssetAccountController', () => {
  let controller: AssetAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetAccountController],
    }).compile();

    controller = module.get<AssetAccountController>(AssetAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

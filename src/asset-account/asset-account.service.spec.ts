import { Test, TestingModule } from '@nestjs/testing';
import { AssetAccountService } from './asset-account.service';

describe('AssetAccountService', () => {
  let service: AssetAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetAccountService],
    }).compile();

    service = module.get<AssetAccountService>(AssetAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

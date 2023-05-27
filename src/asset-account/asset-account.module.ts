import { AssetAccountSchema } from './schemas/asset-account.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AssetAccountController } from './asset-account.controller';
import { AssetAccountService } from './asset-account.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AssetAccount', schema: AssetAccountSchema }]),
  ], // add
  controllers: [AssetAccountController],
  providers: [AssetAccountService]
})
export class AssetAccountModule {}

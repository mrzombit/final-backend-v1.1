import { CurrencySchema } from './schemas/currency.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Currency', schema: CurrencySchema }]),
  ], // add
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}

import { PeriodSchema } from './schemas/period.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PeriodController } from './period.controller';
import { PeriodService } from './period.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Period', schema: PeriodSchema }]),
  ], // add
  controllers: [PeriodController],
  providers: [PeriodService]
})
export class PeriodModule {}

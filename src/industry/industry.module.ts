import { IndustrySchema } from './schemas/industry.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { IndustryController } from './industry.controller';
import { IndustryService } from './industry.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Industry', schema: IndustrySchema }]),
  ], // add
  controllers: [IndustryController],
  providers: [IndustryService]
})
export class IndustryModule {}

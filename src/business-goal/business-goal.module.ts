import { BusinessGoalSchema } from './schemas/business-goal.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BusinessGoalController } from './business-goal.controller';
import { BusinessGoalService } from './business-goal.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BusinessGoal', schema: BusinessGoalSchema }]),
  ], // add
  controllers: [BusinessGoalController],
  providers: [BusinessGoalService],
})
export class BusinessGoalModule {}

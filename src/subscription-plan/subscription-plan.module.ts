import { SubscriptionPlanSchema } from './schemas/subscription-plan.schema';
import { SubscriptionPlanController } from './subscription-plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription-plan.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'SubscriptionPlan', schema: SubscriptionPlanSchema}]),
  ],
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService]
})
export class SubscriptionPlanModule {}

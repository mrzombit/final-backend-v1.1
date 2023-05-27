import { SubscriptionPlan } from './interfaces/subscription-plan.interface';
import { CreateSubscriptionPlanDTO } from './dto/create-subscription-plan.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SubscriptionPlanService {

    constructor(@InjectModel('SubscriptionPlan') private readonly subscriptionPlanModel: Model<SubscriptionPlan>) { }

    async addSubscriptionPlan(createSubscriptionPlanDTO: CreateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
        const newSubscriptionPlan = await new this.subscriptionPlanModel(createSubscriptionPlanDTO);
        return newSubscriptionPlan.save();
      }  
        
      async getSubscriptionPlan(subscriptionPlanID): Promise<SubscriptionPlan> {
        const subscriptionPlan = await this.subscriptionPlanModel
          .findById(subscriptionPlanID)
          .exec();
        return subscriptionPlan;
      }
        
      async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
        const subscriptionPlans = await this.subscriptionPlanModel.find().exec();
        return subscriptionPlans;
      }
    
      async editSubscriptionPlan(subscriptionPlanID, createSubscriptionPlanDTO: CreateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
        const editedSubscriptionPlan = await this.subscriptionPlanModel
          .findByIdAndUpdate(subscriptionPlanID, createSubscriptionPlanDTO, { new: true });
        return editedSubscriptionPlan;
      }
      async deleteSubscriptionPlan(subscriptionPlanID): Promise<any> {
        const deletedSubscriptionPlan = await this.subscriptionPlanModel
          .findByIdAndRemove(subscriptionPlanID);
        return deletedSubscriptionPlan;
      }
}

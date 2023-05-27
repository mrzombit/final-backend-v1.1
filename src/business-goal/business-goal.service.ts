import { CreateBusinessGoalDTO } from './dto/create-business-goal.dto';
import { BusinessGoal } from './interfaces/business-goal.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BusinessGoalService {
    constructor(@InjectModel('BusinessGoal') private readonly businessGoalModel: Model<BusinessGoal>) { }

    async addBusinessGoal(createBusinessGoalDTO: CreateBusinessGoalDTO): Promise<BusinessGoal> {
        const newBusinessGoal = await new this.businessGoalModel(createBusinessGoalDTO);
        return newBusinessGoal.save();
      }  
        
      async getBusinessGoal(businessGoalID): Promise<BusinessGoal> {
        const businessGoal = await this.businessGoalModel
          .findById(businessGoalID)
          .exec();
        return businessGoal;
      }
        
      async getBusinessGoals(): Promise<BusinessGoal[]> {
        const businessGoals = await this.businessGoalModel.find().exec();
        return businessGoals;
      }
    
      async editBusinessGoal(businessGoalID, createBusinessGoalDTO: CreateBusinessGoalDTO): Promise<BusinessGoal> {
        const editedBusinessGoal = await this.businessGoalModel
          .findByIdAndUpdate(businessGoalID, createBusinessGoalDTO, { new: true });
        return editedBusinessGoal;
      }
      async deleteBusinessGoal(businessGoalID): Promise<any> {
        const deletedBusinessGoal = await this.businessGoalModel
          .findByIdAndRemove(businessGoalID);
        return deletedBusinessGoal;
      }
}

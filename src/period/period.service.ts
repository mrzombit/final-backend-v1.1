import { CreatePeriodDTO } from './dto/create-period.dto';
import { Period } from './interfaces/period.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PeriodService {
    constructor(@InjectModel('Period') private readonly periodModel: Model<Period>) { }

    async addPeriod(createPeriodDTO: CreatePeriodDTO): Promise<Period> {
        const newPeriod = await new this.periodModel(createPeriodDTO);
        return newPeriod.save();
      }  
        
      async getPeriod(periodID): Promise<Period> {
        const period = await this.periodModel
          .findById(periodID)
          .exec();
        return period;
      }
        
      async getPeriods(): Promise<Period[]> {
        const periods = await this.periodModel.find().exec();
        return periods;
      }
    
      async editPeriod(periodID, createPeriodDTO: CreatePeriodDTO): Promise<Period> {
        const editedPeriod = await this.periodModel
          .findByIdAndUpdate(periodID, createPeriodDTO, { new: true });
        return editedPeriod;
      }
      async deletePeriod(periodID): Promise<any> {
        const deletedPeriod = await this.periodModel
          .findByIdAndRemove(periodID);
        return deletedPeriod;
      }
}

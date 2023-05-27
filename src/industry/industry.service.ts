import { CreateIndustryDTO } from './dto/create-industry.dto';
import { Industry } from './interfaces/industry.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class IndustryService {
    constructor(@InjectModel('Industry') private readonly industryModel: Model<Industry>) { }

    async addIndustry(createIndustryDTO: CreateIndustryDTO): Promise<Industry> {
        const newIndustry = await new this.industryModel(createIndustryDTO);
        return newIndustry.save();
      }  
        
      async getIndustry(industryID): Promise<Industry> {
        const industry = await this.industryModel
          .findById(industryID)
          .exec();
        return industry;
      }
        
      async getIndustrys(): Promise<Industry[]> {
        const industrys = await this.industryModel.find().exec();
        return industrys;
      }
    
      async editIndustry(industryID, createIndustryDTO: CreateIndustryDTO): Promise<Industry> {
        const editedIndustry = await this.industryModel
          .findByIdAndUpdate(industryID, createIndustryDTO, { new: true });
        return editedIndustry;
      }
      async deleteIndustry(industryID): Promise<any> {
        const deletedIndustry = await this.industryModel
          .findByIdAndRemove(industryID);
        return deletedIndustry;
      }
}

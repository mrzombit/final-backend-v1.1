import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BigService {
    constructor(@InjectModel('Big') private readonly smallModel: Model<Big>) { }

    async addBig(createBigDTO: CreateBigDTO): Promise<Big> {
        const newBig = await new this.smallModel(createBigDTO);
        return newBig.save();
      }  
        
      async getBig(smallID): Promise<Big> {
        const small = await this.smallModel
          .findById(smallID)
          .exec();
        return small;
      }
        
      async getBigs(): Promise<Big[]> {
        const smalls = await this.smallModel.find().exec();
        return smalls;
      }
    
      async editBig(smallID, createBigDTO: CreateBigDTO): Promise<Big> {
        const editedBig = await this.smallModel
          .findByIdAndUpdate(smallID, createBigDTO, { new: true });
        return editedBig;
      }
      async deleteBig(smallID): Promise<any> {
        const deletedBig = await this.smallModel
          .findByIdAndRemove(smallID);
        return deletedBig;
      }
}

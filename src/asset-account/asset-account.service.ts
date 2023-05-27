import { CreateAssetAccountDTO } from './dto/create-asset-account.dto';
import { AssetAccount } from './interfaces/asset-account.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssetAccountService {
    constructor(@InjectModel('AssetAccount') private readonly assetAccountModel: Model<AssetAccount>) { }

    async addAssetAccount(createAssetAccountDTO: CreateAssetAccountDTO): Promise<AssetAccount> {
        const newAssetAccount = await new this.assetAccountModel(createAssetAccountDTO);
        return newAssetAccount.save();
      }  
        
      async getAssetAccount(assetAccountID): Promise<AssetAccount> {
        const assetAccount = await this.assetAccountModel
          .findById(assetAccountID)
          .exec();
        return assetAccount;
      }
        
      async getAssetAccounts(): Promise<AssetAccount[]> {
        const assetAccounts = await this.assetAccountModel.find().exec();
        return assetAccounts;
      }
    
      async editAssetAccount(assetAccountID, createAssetAccountDTO: CreateAssetAccountDTO): Promise<AssetAccount> {
        const editedAssetAccount = await this.assetAccountModel
          .findByIdAndUpdate(assetAccountID, createAssetAccountDTO, { new: true });
        return editedAssetAccount;
      }
      async deleteAssetAccount(assetAccountID): Promise<any> {
        const deletedAssetAccount = await this.assetAccountModel
          .findByIdAndRemove(assetAccountID);
        return deletedAssetAccount;
      }
}

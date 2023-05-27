import { CreateCurrencyDTO } from './dto/create-currency.dto';
import { Currency } from './interfaces/currency.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CurrencyService {
    constructor(@InjectModel('Currency') private readonly currencyModel: Model<Currency>) { }

    async addCurrency(createCurrencyDTO: CreateCurrencyDTO): Promise<Currency> {
        const newCurrency = await new this.currencyModel(createCurrencyDTO);
        return newCurrency.save();
      }  
        
      async getCurrency(currencyID): Promise<Currency> {
        const currency = await this.currencyModel
          .findById(currencyID)
          .exec();
        return currency;
      }
        
      async getCurrencys(): Promise<Currency[]> {
        const currencys = await this.currencyModel.find().exec();
        return currencys;
      }
    
      async editCurrency(currencyID, createCurrencyDTO: CreateCurrencyDTO): Promise<Currency> {
        const editedCurrency = await this.currencyModel
          .findByIdAndUpdate(currencyID, createCurrencyDTO, { new: true });
        return editedCurrency;
      }
      async deleteCurrency(currencyID): Promise<any> {
        const deletedCurrency = await this.currencyModel
          .findByIdAndRemove(currencyID);
        return deletedCurrency;
      }
}

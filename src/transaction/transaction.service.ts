import { Transaction } from './interfaces/transaction.interface';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private readonly transactionModel: Model<Transaction>) { }

    async addTransaction(createTransactionDTO: CreateTransactionDTO): Promise<Transaction> {
        const newTransaction = await new this.transactionModel(createTransactionDTO);
        return newTransaction.save();
      }  
        
      async getTransaction(transactionID): Promise<Transaction> {
        const transaction = await this.transactionModel
          .findById(transactionID)
          .exec();
        return transaction;
      }

      async getTransactionsByUserID(userID): Promise<Transaction[]> {
        const transactions = await this.transactionModel
          .find({ "user_id" : userID })
          .exec();
        return transactions;
      }

      
        
      async getTransactions(): Promise<Transaction[]> {
        const transactions = await this.transactionModel.find().exec();
        return transactions;
      }
    
      async editTransaction(transactionID, createTransactionDTO: CreateTransactionDTO): Promise<Transaction> {
        const editedTransaction = await this.transactionModel
          .findByIdAndUpdate(transactionID, createTransactionDTO, { new: true });
        return editedTransaction;
      }
      async deleteTransaction(transactionID): Promise<any> {
        const deletedTransaction = await this.transactionModel
          .findByIdAndRemove(transactionID);
        return deletedTransaction;
      }
}

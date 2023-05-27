import { ValidateObjectId } from './../user/shared/pipes/validate-object-id.pipes';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {

    constructor(private transactionService: TransactionService){ }

    @Post('/post')
    async addTransaction(@Res() res, @Body() createTransactionDTO: CreateTransactionDTO){
        const newTransaction = await this.transactionService.addTransaction(createTransactionDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Transaction has been submitted successfully!',
            transaction: newTransaction,
        });
    }
    
    @Get('post/:transactionID') //"../transaction/post/1"
    async getTransaction(@Res() res, @Param('transactionID', new ValidateObjectId()) transactionID) {
    const transaction = await this.transactionService.getTransaction(transactionID);
    if (!transaction) {
        throw new NotFoundException('Transaction does not exist!');
    }
    return res.status(HttpStatus.OK).json(transaction);
    }

    @Get('user/:userID') //"../transaction/user/1"
    async getTransactionsByUserID(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
    const transactions = await this.transactionService.getTransactionsByUserID(userID);
    if (!transactions) {
        throw new NotFoundException('Transaction does not exist!');
    }
    return res.status(HttpStatus.OK).json(transactions);
    }

    @Get('transactions') //"../transaction/transactions"
    async getTransactions(@Res() res) {
    const transactions = await this.transactionService.getTransactions();
    return res.status(HttpStatus.OK).json(transactions);
    }

    @Put('/edit')
    async editTransaction(
      @Res() res,
      @Query('transactionID', new ValidateObjectId()) transactionID,
      @Body() createTransactionDTO: CreateTransactionDTO,
    ) {
      const editedTransaction = await this.transactionService.editTransaction(transactionID, createTransactionDTO);
      if (!editedTransaction) {
          throw new NotFoundException('Transaction does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Transaction has been successfully updated',
        transaction: editedTransaction,
      });
    }

    @Delete('/delete')
    async deleteTransaction(@Res() res, @Query('transactionID', new ValidateObjectId()) transactionID) {
      const deletedTransaction = await this.transactionService.deleteTransaction(transactionID);
      if (!deletedTransaction) {
          throw new NotFoundException('Transaction does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Transaction has been deleted!',
        transaction: deletedTransaction,
      });
    }
}

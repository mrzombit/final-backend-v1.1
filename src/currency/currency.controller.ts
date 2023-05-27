import { ValidateObjectId } from './../user/shared/pipes/validate-object-id.pipes';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDTO } from './dto/create-currency.dto';

@Controller('currency')
export class CurrencyController {

    constructor(private currencyService: CurrencyService){ }

    @Post('/post')
    async addCurrency(@Res() res, @Body() createCurrencyDTO: CreateCurrencyDTO){
        const newCurrency = await this.currencyService.addCurrency(createCurrencyDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Currency has been submitted successfully!',
            currency: newCurrency,
        });
    }
    
    @Get('post/:currencyID') //"../currency/post/1"
    async getCurrency(@Res() res, @Param('currencyID', new ValidateObjectId()) currencyID) {
    const currency = await this.currencyService.getCurrency(currencyID);
    if (!currency) {
        throw new NotFoundException('Currency does not exist!');
    }
    return res.status(HttpStatus.OK).json(currency);
    }

    @Get('currencys') //"../currency/currencys"
    async getCurrencys(@Res() res) {
    const currencys = await this.currencyService.getCurrencys();
    return res.status(HttpStatus.OK).json(currencys);
    }

    @Put('/edit')
    async editCurrency(
      @Res() res,
      @Query('currencyID', new ValidateObjectId()) currencyID,
      @Body() createCurrencyDTO: CreateCurrencyDTO,
    ) {
      const editedCurrency = await this.currencyService.editCurrency(currencyID, createCurrencyDTO);
      if (!editedCurrency) {
          throw new NotFoundException('Currency does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Currency has been successfully updated',
        currency: editedCurrency,
      });
    }

    @Delete('/delete')
    async deleteCurrency(@Res() res, @Query('currencyID', new ValidateObjectId()) currencyID) {
      const deletedCurrency = await this.currencyService.deleteCurrency(currencyID);
      if (!deletedCurrency) {
          throw new NotFoundException('Currency does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Currency has been deleted!',
        currency: deletedCurrency,
      });
    }
}
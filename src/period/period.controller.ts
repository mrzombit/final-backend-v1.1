import { ValidateObjectId } from './../user/shared/pipes/validate-object-id.pipes';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { PeriodService } from './period.service';
import { CreatePeriodDTO } from './dto/create-period.dto';

@Controller('period')
export class PeriodController {

    constructor(private periodService: PeriodService){ }

    @Post('/post')
    async addPeriod(@Res() res, @Body() createPeriodDTO: CreatePeriodDTO){
        const newPeriod = await this.periodService.addPeriod(createPeriodDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Period has been submitted successfully!',
            period: newPeriod,
        });
    }
    
    @Get('post/:periodID') //"../period/post/1"
    async getPeriod(@Res() res, @Param('periodID', new ValidateObjectId()) periodID) {
    const period = await this.periodService.getPeriod(periodID);
    if (!period) {
        throw new NotFoundException('Period does not exist!');
    }
    return res.status(HttpStatus.OK).json(period);
    }

    @Get('periods') //"../period/periods"
    async getPeriods(@Res() res) {
    const periods = await this.periodService.getPeriods();
    return res.status(HttpStatus.OK).json(periods);
    }

    @Put('/edit')
    async editPeriod(
      @Res() res,
      @Query('periodID', new ValidateObjectId()) periodID,
      @Body() createPeriodDTO: CreatePeriodDTO,
    ) {
      const editedPeriod = await this.periodService.editPeriod(periodID, createPeriodDTO);
      if (!editedPeriod) {
          throw new NotFoundException('Period does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Period has been successfully updated',
        period: editedPeriod,
      });
    }

    @Delete('/delete')
    async deletePeriod(@Res() res, @Query('periodID', new ValidateObjectId()) periodID) {
      const deletedPeriod = await this.periodService.deletePeriod(periodID);
      if (!deletedPeriod) {
          throw new NotFoundException('Period does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Period has been deleted!',
        period: deletedPeriod,
      });
    }
}
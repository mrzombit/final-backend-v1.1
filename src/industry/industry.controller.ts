import { ValidateObjectId } from './../user/shared/pipes/validate-object-id.pipes';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { CreateIndustryDTO } from './dto/create-industry.dto';

@Controller('industry')
export class IndustryController {

    constructor(private industryService: IndustryService){ }

    @Post('/post')
    async addIndustry(@Res() res, @Body() createIndustryDTO: CreateIndustryDTO){
        const newIndustry = await this.industryService.addIndustry(createIndustryDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Industry has been submitted successfully!',
            industry: newIndustry,
        });
    }
    
    @Get('post/:industryID') //"../industry/post/1"
    async getIndustry(@Res() res, @Param('industryID', new ValidateObjectId()) industryID) {
    const industry = await this.industryService.getIndustry(industryID);
    if (!industry) {
        throw new NotFoundException('Industry does not exist!');
    }
    return res.status(HttpStatus.OK).json(industry);
    }

    @Get('industrys') //"../industry/industrys"
    async getIndustrys(@Res() res) {
    const industrys = await this.industryService.getIndustrys();
    return res.status(HttpStatus.OK).json(industrys);
    }
    
    @Put('/edit')
    async editIndustry(
      @Res() res,
      @Query('industryID', new ValidateObjectId()) industryID,
      @Body() createIndustryDTO: CreateIndustryDTO,
    ) {
      const editedIndustry = await this.industryService.editIndustry(industryID, createIndustryDTO);
      if (!editedIndustry) {
          throw new NotFoundException('Industry does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Industry has been successfully updated',
        industry: editedIndustry,
      });
    }

    @Delete('/delete')
    async deleteIndustry(@Res() res, @Query('industryID', new ValidateObjectId()) industryID) {
      const deletedIndustry = await this.industryService.deleteIndustry(industryID);
      if (!deletedIndustry) {
          throw new NotFoundException('Industry does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Industry has been deleted!',
        industry: deletedIndustry,
      });
    }
}
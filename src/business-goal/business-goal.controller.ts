import { ValidateObjectId } from './../user/shared/pipes/validate-object-id.pipes';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { BusinessGoalService } from './business-goal.service';
import { CreateBusinessGoalDTO } from './dto/create-business-goal.dto';

@Controller('businessGoal')
export class BusinessGoalController {

    constructor(private businessGoalService: BusinessGoalService){ }

    @Post('/post')
    async addBusinessGoal(@Res() res, @Body() createBusinessGoalDTO: CreateBusinessGoalDTO){
        const newBusinessGoal = await this.businessGoalService.addBusinessGoal(createBusinessGoalDTO);
        return res.status(HttpStatus.OK).json({
            message: 'BusinessGoal has been submitted successfully!',
            businessGoal: newBusinessGoal,
        });
    }
    
    @Get('post/:businessGoalID') //"../businessGoal/post/1"
    async getBusinessGoal(@Res() res, @Param('businessGoalID', new ValidateObjectId()) businessGoalID) {
    const businessGoal = await this.businessGoalService.getBusinessGoal(businessGoalID);
    if (!businessGoal) {
        throw new NotFoundException('BusinessGoal does not exist!');
    }
    return res.status(HttpStatus.OK).json(businessGoal);
    }

    @Get('businessGoals') //"../businessGoal/businessGoals"
    async getBusinessGoals(@Res() res) {
    const businessGoals = await this.businessGoalService.getBusinessGoals();
    return res.status(HttpStatus.OK).json(businessGoals);
    }

    @Put('/edit')
    async editBusinessGoal(
      @Res() res,
      @Query('businessGoalID', new ValidateObjectId()) businessGoalID,
      @Body() createBusinessGoalDTO: CreateBusinessGoalDTO,
    ) {
      const editedBusinessGoal = await this.businessGoalService.editBusinessGoal(businessGoalID, createBusinessGoalDTO);
      if (!editedBusinessGoal) {
          throw new NotFoundException('BusinessGoal does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'BusinessGoal has been successfully updated',
        businessGoal: editedBusinessGoal,
      });
    }

    @Delete('/delete')
    async deleteBusinessGoal(@Res() res, @Query('businessGoalID', new ValidateObjectId()) businessGoalID) {
      const deletedBusinessGoal = await this.businessGoalService.deleteBusinessGoal(businessGoalID);
      if (!deletedBusinessGoal) {
          throw new NotFoundException('BusinessGoal does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'BusinessGoal has been deleted!',
        businessGoal: deletedBusinessGoal,
      });
    }
}
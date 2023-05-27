import { ValidateObjectId } from './../currency/shared/pipes/validate-object-id.pipes';
import { CreateSubscriptionPlanDTO } from './dto/create-subscription-plan.dto';
import { SubscriptionPlanService } from './subscription-plan.service';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';

@Controller('subscriptionPlan')
export class SubscriptionPlanController {
    
    constructor(private subscriptionPlanService: SubscriptionPlanService){ }

    @Post('/post')
    async addSubscriptionPlan(@Res() res, @Body() createSubscriptionPlanDTO: CreateSubscriptionPlanDTO){
        const newSubscriptionPlan = await this.subscriptionPlanService.addSubscriptionPlan(createSubscriptionPlanDTO);
        return res.status(HttpStatus.OK).json({
            message: 'SubscriptionPlan has been submitted successfully!',
            post: newSubscriptionPlan,
        });
    }
    @Get('post/:subscriptionPlanID') //"../subscriptionPlan/post/1"
    async getSubscriptionPlan(@Res() res, @Param('subscriptionPlanID', new ValidateObjectId()) subscriptionPlanID) {
      // console.log(subscriptionPlanID)
      console.log("here")
      const subscriptionPlan = await this.subscriptionPlanService.getSubscriptionPlan(subscriptionPlanID);
    if (!subscriptionPlan) {
        throw new NotFoundException('SubscriptionPlan does not exist!');
    }
    return res.status(HttpStatus.OK).json(subscriptionPlan);
    }

    @Get('subscriptionPlans') //"../subscriptionPlan/subscriptionPlans"
    async getSubscriptionPlans(@Res() res) {
    const subscriptionPlans = await this.subscriptionPlanService.getSubscriptionPlans();
    return res.status(HttpStatus.OK).json(subscriptionPlans);
    }

    @Put('/edit')
    async editSubscriptionPlan(
      @Res() res,
      @Query('subscriptionPlanID', new ValidateObjectId()) subscriptionPlanID,
      @Body() createSubscriptionPlanDTO: CreateSubscriptionPlanDTO,
    ) {
      const editedSubscriptionPlan = await this.subscriptionPlanService.editSubscriptionPlan(subscriptionPlanID, createSubscriptionPlanDTO);
      if (!editedSubscriptionPlan) {
          throw new NotFoundException('SubscriptionPlan does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'SubscriptionPlan has been successfully updated',
        subscriptionPlan: editedSubscriptionPlan,
      });
    }

    @Delete('/delete')
    async deleteSubscriptionPlan(@Res() res, @Query('subscriptionPlanID', new ValidateObjectId()) subscriptionPlanID) {
      const deletedSubscriptionPlan = await this.subscriptionPlanService.deleteSubscriptionPlan(subscriptionPlanID);
      if (!deletedSubscriptionPlan) {
          throw new NotFoundException('SubscriptionPlan does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'SubscriptionPlan has been deleted!',
        subscriptionPlan: deletedSubscriptionPlan,
      });
    }
}

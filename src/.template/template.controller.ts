import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';

@Controller('small')
export class BigController {

    constructor(private smallService: BigService){ }

    @Post('/post')
    async addBig(@Res() res, @Body() createBigDTO: CreateBigDTO){
        const newBig = await this.smallService.addBig(createBigDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Big has been submitted successfully!',
            small: newBig,
        });
    }
    
    @Get('post/:smallID') //"../small/post/1"
    async getBig(@Res() res, @Param('smallID', new ValidateObjectId()) smallID) {
    const small = await this.smallService.getBig(smallID);
    if (!small) {
        throw new NotFoundException('Big does not exist!');
    }
    return res.status(HttpStatus.OK).json(small);
    }

    @Get('smalls') //"../small/smalls"
    async getBigs(@Res() res) {
    const smalls = await this.smallService.getBigs();
    return res.status(HttpStatus.OK).json(smalls);
    }

    @Put('/edit')
    async editBig(
      @Res() res,
      @Query('smallID', new ValidateObjectId()) smallID,
      @Body() createBigDTO: CreateBigDTO,
    ) {
      const editedBig = await this.smallService.editBig(smallID, createBigDTO);
      if (!editedBig) {
          throw new NotFoundException('Big does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Big has been successfully updated',
        small: editedBig,
      });
    }

    @Delete('/delete')
    async deleteBig(@Res() res, @Query('smallID', new ValidateObjectId()) smallID) {
      const deletedBig = await this.smallService.deleteBig(smallID);
      if (!deletedBig) {
          throw new NotFoundException('Big does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Big has been deleted!',
        small: deletedBig,
      });
    }
}

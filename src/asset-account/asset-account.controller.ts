import { ValidateObjectId } from './../user/shared/pipes/validate-object-id.pipes';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { AssetAccountService } from './asset-account.service';
import { CreateAssetAccountDTO } from './dto/create-asset-account.dto';

@Controller('assetAccount')
export class AssetAccountController {

    constructor(private assetAccountService: AssetAccountService){ }

    @Post('/post')
    async addAssetAccount(@Res() res, @Body() createAssetAccountDTO: CreateAssetAccountDTO){
        const newAssetAccount = await this.assetAccountService.addAssetAccount(createAssetAccountDTO);
        return res.status(HttpStatus.OK).json({
            message: 'AssetAccount has been submitted successfully!',
            assetAccount: newAssetAccount,
        });
    }
    
    @Get('post/:assetAccountID') //"../assetAccount/post/1"
    async getAssetAccount(@Res() res, @Param('assetAccountID', new ValidateObjectId()) assetAccountID) {
    const assetAccount = await this.assetAccountService.getAssetAccount(assetAccountID);
    if (!assetAccount) {
        throw new NotFoundException('AssetAccount does not exist!');
    }
    return res.status(HttpStatus.OK).json(assetAccount);
    }

    @Get('assetAccounts') //"../assetAccount/assetAccounts"
    async getAssetAccounts(@Res() res) {
    const assetAccounts = await this.assetAccountService.getAssetAccounts();
    return res.status(HttpStatus.OK).json(assetAccounts);
    }

    @Put('/edit')
    async editAssetAccount(
      @Res() res,
      @Query('assetAccountID', new ValidateObjectId()) assetAccountID,
      @Body() createAssetAccountDTO: CreateAssetAccountDTO,
    ) {
      const editedAssetAccount = await this.assetAccountService.editAssetAccount(assetAccountID, createAssetAccountDTO);
      if (!editedAssetAccount) {
          throw new NotFoundException('AssetAccount does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'AssetAccount has been successfully updated',
        assetAccount: editedAssetAccount,
      });
    }

    @Delete('/delete')
    async deleteAssetAccount(@Res() res, @Query('assetAccountID', new ValidateObjectId()) assetAccountID) {
      const deletedAssetAccount = await this.assetAccountService.deleteAssetAccount(assetAccountID);
      if (!deletedAssetAccount) {
          throw new NotFoundException('AssetAccount does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'AssetAccount has been deleted!',
        assetAccount: deletedAssetAccount,
      });
    }
}

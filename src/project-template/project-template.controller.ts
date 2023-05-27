import { ValidateObjectId } from './../user/shared/pipes/validate-object-id.pipes';
import { CreateProjectTemplateDTO } from './dto/create-project-template.dto';
import { ProjectTemplateService } from './project-template.service';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projectTemplate')
export class ProjectTemplateController {

  constructor(private projectTemplateService: ProjectTemplateService) { }

  @Post('/post')
  async addProjectTemplate(@Res() res, @Body() createProjectTemplateDTO: CreateProjectTemplateDTO) {
    const newProjectTemplate = await this.projectTemplateService.addProjectTemplate(createProjectTemplateDTO);
    return res.status(HttpStatus.OK).json({
      message: 'ProjectTemplate has been submitted successfully!',
      projectTemplate: newProjectTemplate,
    });
  }

  @Get('post/:projectTemplateID') //"../projectTemplate/post/1"
  async getProjectTemplate(@Res() res, @Param('projectTemplateID', new ValidateObjectId()) projectTemplateID) {
    const projectTemplate = await this.projectTemplateService.getProjectTemplate(projectTemplateID);
    if (!projectTemplate) {
      throw new NotFoundException('ProjectTemplate does not exist!');
    }
    return res.status(HttpStatus.OK).json(projectTemplate);
  }

  @Get('user/:userID') //"../transaction/user/1"
  async getProjectTemplatesByUserID(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
    const projectTemplates = await this.projectTemplateService.getProjectTemplatesByUserID(userID);
    if (!projectTemplates) {
      throw new NotFoundException('Transaction does not exist!');
    }
    return res.status(HttpStatus.OK).json(projectTemplates);
  }

  @Get('projectTemplates') //"../projectTemplate/projectTemplates"
  async getProjectTemplates(@Res() res) {
    const projectTemplates = await this.projectTemplateService.getProjectTemplates();
    return res.status(HttpStatus.OK).json(projectTemplates);
  }

  @Put('/edit')
  async editProjectTemplate(
    @Res() res,
    @Query('projectTemplateID', new ValidateObjectId()) projectTemplateID,
    @Body() createProjectTemplateDTO: CreateProjectTemplateDTO,
  ) {
    const editedProjectTemplate = await this.projectTemplateService.editProjectTemplate(projectTemplateID, createProjectTemplateDTO);
    if (!editedProjectTemplate) {
      throw new NotFoundException('ProjectTemplate does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'ProjectTemplate has been successfully updated',
      projectTemplate: editedProjectTemplate,
    });
  }

  @Delete('/delete')
  async deleteProjectTemplate(@Res() res, @Query('projectTemplateID', new ValidateObjectId()) projectTemplateID) {
    const deletedProjectTemplate = await this.projectTemplateService.deleteProjectTemplate(projectTemplateID);
    if (!deletedProjectTemplate) {
      throw new NotFoundException('ProjectTemplate does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'ProjectTemplate has been deleted!',
      projectTemplate: deletedProjectTemplate,
    });
  }
}

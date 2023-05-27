import { ValidateObjectId } from './../user/shared/pipes/validate-object-id.pipes';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {

  constructor(private projectService: ProjectService) { }

  @Post('/post')
  async addProject(@Res() res, @Body() createProjectDTO: CreateProjectDTO) {
    const newProject = await this.projectService.addProject(createProjectDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Project has been submitted successfully!',
      project: newProject,
    });
  }

  @Get('post/:projectID') //"../project/post/1"
  async getProject(@Res() res, @Param('projectID', new ValidateObjectId()) projectID) {
    const project = await this.projectService.getProject(projectID);
    if (!project) {
      throw new NotFoundException('Project does not exist!');
    }
    return res.status(HttpStatus.OK).json(project);
  }

  @Get('user/:userID') //"../transaction/user/1"
  async getProjectsByUserID(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
    const projects = await this.projectService.getProjectsByUserID(userID);
    if (!projects) {
      throw new NotFoundException('Transaction does not exist!');
    }
    return res.status(HttpStatus.OK).json(projects);
  }

  @Get('projects') //"../project/projects"
  async getProjects(@Res() res) {
    const projects = await this.projectService.getProjects();
    return res.status(HttpStatus.OK).json(projects);
  }

  @Put('/edit')
  async editProject(
    @Res() res,
    @Query('projectID', new ValidateObjectId()) projectID,
    @Body() createProjectDTO: CreateProjectDTO,
  ) {
    const editedProject = await this.projectService.editProject(projectID, createProjectDTO);
    if (!editedProject) {
      throw new NotFoundException('Project does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Project has been successfully updated',
      project: editedProject,
    });
  }

  @Delete('/delete')
  async deleteProject(@Res() res, @Query('projectID', new ValidateObjectId()) projectID) {
    const deletedProject = await this.projectService.deleteProject(projectID);
    if (!deletedProject) {
      throw new NotFoundException('Project does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Project has been deleted!',
      project: deletedProject,
    });
  }
}

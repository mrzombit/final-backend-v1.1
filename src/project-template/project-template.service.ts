import { ProjectTemplate } from './interfaces/project-template.interface';
import { CreateProjectTemplateDTO } from './dto/create-project-template.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjectTemplateService {
    constructor(@InjectModel('ProjectTemplate') private readonly projectTemplateModel: Model<ProjectTemplate>) { }

    async addProjectTemplate(createProjectTemplateDTO: CreateProjectTemplateDTO): Promise<ProjectTemplate> {
        const newProjectTemplate = await new this.projectTemplateModel(createProjectTemplateDTO);
        return newProjectTemplate.save();
      }  
        
      async getProjectTemplate(projectTemplateID): Promise<ProjectTemplate> {
        const projectTemplate = await this.projectTemplateModel
          .findById(projectTemplateID)
          .exec();
        return projectTemplate;
      }

      async getProjectTemplatesByUserID(userID): Promise<ProjectTemplate[]> {
        const projectTemplates = await this.projectTemplateModel
          .find({ "user_id" : userID })
          .exec();
        return projectTemplates;
      }
        
      async getProjectTemplates(): Promise<ProjectTemplate[]> {
        const projectTemplates = await this.projectTemplateModel.find().exec();
        return projectTemplates;
      }
    
      async editProjectTemplate(projectTemplateID, createProjectTemplateDTO: CreateProjectTemplateDTO): Promise<ProjectTemplate> {
        const editedProjectTemplate = await this.projectTemplateModel
          .findByIdAndUpdate(projectTemplateID, createProjectTemplateDTO, { new: true });
        return editedProjectTemplate;
      }
      async deleteProjectTemplate(projectTemplateID): Promise<any> {
        const deletedProjectTemplate = await this.projectTemplateModel
          .findByIdAndRemove(projectTemplateID);
        return deletedProjectTemplate;
      }
}

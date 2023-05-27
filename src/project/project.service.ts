import { Project } from './interfaces/project.interface';
import { CreateProjectDTO } from './dto/create-project.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) { }

    async addProject(createProjectDTO: CreateProjectDTO): Promise<Project> {
        const newProject = await new this.projectModel(createProjectDTO);
        return newProject.save();
      }  
        
      async getProject(projectID): Promise<Project> {
        const project = await this.projectModel
          .findById(projectID)
          .exec();
        return project;
      }

      async getProjectsByUserID(userID): Promise<Project[]> {
        const projects = await this.projectModel
          .find({ "user_id" : userID })
          .exec();
        return projects;
      }
        
      async getProjects(): Promise<Project[]> {
        const projects = await this.projectModel.find().exec();
        return projects;
      }
    
      async editProject(projectID, createProjectDTO: CreateProjectDTO): Promise<Project> {
        const editedProject = await this.projectModel
          .findByIdAndUpdate(projectID, createProjectDTO, { new: true });
        return editedProject;
      }
      async deleteProject(projectID): Promise<any> {
        const deletedProject = await this.projectModel
          .findByIdAndRemove(projectID);
        return deletedProject;
      }
}

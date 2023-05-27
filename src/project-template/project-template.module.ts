import { ProjectTemplateSchema } from './schemas/project-template.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProjectTemplateController } from './project-template.controller';
import { ProjectTemplateService } from './project-template.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ProjectTemplate', schema: ProjectTemplateSchema }]),
  ],
  controllers: [ProjectTemplateController],
  providers: [ProjectTemplateService]
})
export class ProjectTemplateModule {}

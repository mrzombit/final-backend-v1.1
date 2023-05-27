import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTemplateController } from './project-template.controller';

describe('ProjectTemplateController', () => {
  let controller: ProjectTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTemplateController],
    }).compile();

    controller = module.get<ProjectTemplateController>(ProjectTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

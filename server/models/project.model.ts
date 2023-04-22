import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import { IProject, ITask } from '../interfaces';

@ApiModel({
  description: 'Project where you will add your tasks',
  name: 'Project',
})
export class Project implements IProject {
  @ApiModelProperty({
    description: 'Id of the project',
    example: ['1', '2', '3'],
    required: false,
  })
  id: number;

  @ApiModelProperty({
    description: 'The name of your project',
    required: true,
  })
  name: string;

  @ApiModelProperty({
    description: 'A list with all tasks of the project',
    required: false,
  })
  tasks: Array<ITask>;
}

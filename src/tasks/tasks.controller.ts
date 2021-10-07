import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/task.dto';
import { TaskFilterDto } from './dto/taskfilter.dto';
import { UpdateTaskStatusDto } from './dto/update-tast-status.dto';
import { TaskStatus } from './taskStatus.enum';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private taskService:TasksService){}

    @Get()
    getTasks(@Query() taskFilterDto:TaskFilterDto):Promise<Task[]>{
        return this.taskService.getTasks(taskFilterDto);
    }

    // @Get()
    // getAllTasks(@Query() taskFilterDto:TaskFilterDto):Task[]{

    //     if(Object.keys(taskFilterDto).length){
    //         return this.taskService.getTasksByFilter(taskFilterDto);
    //     }
    //     else return this.taskService.getTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Promise<Task>{
        return this.taskService.getTaskById(id);
    }


    // @Get('/:id')
    // getTaskbyId(@Param('id') id:string):Task{
    //     return this.taskService.getTaskById(id);
    // }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task>{
        return this.taskService.createTask(createTaskDto);
    }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task{
    //     return this.taskService.createTask(createTaskDto);
    // }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): Promise<void>{
        return this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskById(@Param('id') id:string, @Body() updateTaskStatusDto:UpdateTaskStatusDto): Promise<Task>{
        const {status} = updateTaskStatusDto;
        return this.taskService.updateTaskById(id, status);
    }
}

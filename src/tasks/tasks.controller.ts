import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/task.dto';
import { TaskFilterDto } from './dto/taskfilter.dto';
import { UpdateTaskStatusDto } from './dto/update-tast-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService:TasksService){}

    @Get()
    getAllTasks(@Query() taskFilterDto:TaskFilterDto):Task[]{

        if(Object.keys(taskFilterDto).length){
            return this.taskService.getTasksByFilter(taskFilterDto);
        }
        else return this.taskService.getTasks();
    }

    @Get('/:id')
    getTaskbyId(@Param('id') id:string):Task{
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): void{
        this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskById(@Param('id') id:string, @Body() updateTaskStatusDto:UpdateTaskStatusDto): Task{
        const {status} = updateTaskStatusDto;
        return this.taskService.updateTaskById(id, status);
    }
}

import { Injectable } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';
import { CreateTaskDto } from './dto/task.dto';
import { TaskFilterDto } from './dto/taskfilter.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    
    constructor(
        @InjectRepository(TaskRepository) 
        private taskRepository:TaskRepository)
    { }

    // private tasks : Task[] = [];

    // getTasks():Task[]{
    //     return this.tasks;
    // }

    // getTasksByFilter(taskFilterDto:TaskFilterDto):Task[]{

    //     let tasks = this.getTasks();
    //     const {status, search} = taskFilterDto;

    //     if(status){
    //         tasks = tasks.filter((task)=> task.status === status);
    //     }

    //     if(search){
    //         tasks = tasks.filter((task) =>{
    //             if(task.title.includes(search) || task.description.includes(search)) return true; else return false;
    //         })
    //     }

    //     return tasks;
    // }

    async getTaskById(id:string): Promise<Task> {
        let found = this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException('The task with id ${id} not found');
        } else 
        return found;
    }

    // getTaskById(id: string):Task{

    //     const taskFound= this.tasks.find((task) => task.id === id);
    //     if(!taskFound) {
    //         throw new NotFoundException();
    //     } else {
    //         return taskFound;
    //     }

    // }

    createTask(createTaskDto:CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    // createTask(createTaskDto: CreateTaskDto):Task{
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTaskById(id: string) : void{
    //     let taskfound = this.getTaskById(id);
    //     var taskIndex =  this.tasks.findIndex((task) => task.id === id );
    //     this.tasks.splice(taskIndex,1);
    // }

    // updateTaskById(id: string, status: TaskStatus): Task{
    //    let task = this.getTaskById(id);
    //    task.status = status;
    //    return task;
    // } 
}

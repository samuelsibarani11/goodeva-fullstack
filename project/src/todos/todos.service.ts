import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class TodosService {
    // In-memory storage
    private todos: Todo[] = [];

    findAll(search?: string): Todo[] {
        if (search) {
            return this.todos.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
        }
        return this.todos;
    }

    create(dto: CreateTodoDto): Todo {
        const todo: Todo = {
            id: randomUUID(),
            title: dto.title,
            completed: false,
        };
        this.todos.push(todo);
        return todo;
    }

    toggle(id: string): Todo {
        const todo = this.todos.find((t) => t.id === id);
        if (!todo) throw new NotFoundException(`Todo ${id} not found`);
        todo.completed = !todo.completed;
        return todo;
    }
}

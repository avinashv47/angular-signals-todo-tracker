import { Injectable, computed, effect, signal } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos = signal<Todo[]>([]);

  todosList = computed(() => this.todos());
  completedTasks = computed(() => this.todos().filter(t => t.completed));
  pendingTasks = computed(() => this.todos().filter(t => !t.completed));

  constructor() {
    effect(() => {
      console.log('Todos updated:', this.todos());
    });
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };
    this.todos.set([...this.todos(), newTodo]);
  }

  toggleTodo(id: number) {
    this.todos.set(
      this.todos().map(task => task.id === id ? { ...task, completed: !task.completed } : task)
    );
  }

  deleteTodo(id: number) {
    this.todos.set(this.todos().filter(todo => todo.id !== id));
  }
}
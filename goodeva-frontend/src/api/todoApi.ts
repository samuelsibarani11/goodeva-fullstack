import axios from 'axios';
import type { Todo } from '@/types';

// Generate user ID untuk auth, simpan di localStorage
function getUserId(): string {
    const key = 'goodeva_user_id';
    let id = localStorage.getItem(key);
    if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem(key, id);
    }
    return id;
}

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'x-user-id': getUserId() },
});

export const getTodos = async (search?: string): Promise<Todo[]> => {
    const params = search ? { search } : {};
    const response = await api.get<Todo[]>('/todos', { params });
    return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', { title });
    return response.data;
};

export const toggleTodo = async (id: string): Promise<Todo> => {
    const response = await api.patch<Todo>(`/todos/${id}`);
    return response.data;
};

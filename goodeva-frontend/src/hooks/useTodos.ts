import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getTodos, createTodo, toggleTodo } from '@/api/todoApi';
import type { ApiErrorResponse } from '@/types';

export function useTodos(search: string) {
    return useQuery({
        queryKey: ['todos', search],
        queryFn: () => getTodos(search),
    });
}

export function useAddTodo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });
}

export function useToggleTodo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });
}

// Konversi error ke pesan yang bisa dibaca
export function getErrorMessage(error: unknown): string {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const status = axiosError?.response?.status;
    const data = axiosError?.response?.data;

    // Cek pesan dari API
    if (data?.message) {
        if (Array.isArray(data.message)) {
            const msg = data.message[0];
            if (msg.includes('should not be empty')) return 'Judul tidak boleh kosong.';
            return msg;
        }
        return data.message;
    }

    // Fallback berdasarkan status code
    const messages: Record<number, string> = {
        400: 'Permintaan tidak valid.',
        401: 'Tidak dapat terhubung ke server.',
        404: 'Data tidak ditemukan.',
        500: 'Terjadi kesalahan server.',
    };

    if (status && messages[status]) return messages[status];
    if (axiosError?.code === 'ERR_NETWORK') return 'Tidak dapat terhubung ke server.';

    return 'Terjadi kesalahan.';
}

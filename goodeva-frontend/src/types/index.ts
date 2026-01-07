/**
 * Tipe data untuk objek Todo
 */
export interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

/**
 * Tipe response error dari API
 */
export interface ApiErrorResponse {
    message: string | string[];
    error: string;
    statusCode: number;
}

import { Check, AlertCircle } from 'lucide-react';
import { Spinner } from '@/components/atoms';
import { cn } from '@/lib/utils';
import type { Todo } from '@/types';

interface TodoListProps {
    todos: Todo[] | undefined;
    isLoading: boolean;
    isError: boolean;
    errorMessage?: string;
    onToggle: (id: string) => void;
    isToggling: boolean;
}

export function TodoList({ todos, isLoading, isError, errorMessage, onToggle, isToggling }: TodoListProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <Spinner size="lg" className="mb-4 text-indigo-500" />
                <p>Memuat daftar tugas...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-red-500 px-4 text-center">
                <AlertCircle className="h-10 w-10 mb-4" />
                <p className="font-medium">Gagal memuat data</p>
                <p className="text-sm text-red-400 mt-1">{errorMessage || 'Terjadi kesalahan'}</p>
            </div>
        );
    }

    if (!todos?.length) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Check className="h-8 w-8 text-slate-300" />
                </div>
                <p>Belum ada tugas. Tambahkan tugas pertama Anda!</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Tugas
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {todos.map((todo, index) => (
                        <tr key={todo.id} className={cn('hover:bg-slate-50 transition-colors', todo.completed && 'bg-slate-50')}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                                {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={cn('text-base font-medium text-slate-700', todo.completed && 'line-through text-slate-400')}>
                                    {todo.title}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button
                                    onClick={() => onToggle(todo.id)}
                                    disabled={isToggling}
                                    className={cn(
                                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer border shadow-sm',
                                        todo.completed
                                            ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                                    )}
                                >
                                    {todo.completed ? (
                                        <>
                                            <Check className="w-3 h-3 mr-1.5" />
                                            Selesai
                                        </>
                                    ) : (
                                        'Aktif'
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

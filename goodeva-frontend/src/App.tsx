import { useState } from 'react';
import { TodoForm, TodoList } from '@/components/organisms';
import { SearchInput } from '@/components/molecules';
import { useTodos, useAddTodo, useToggleTodo, getErrorMessage } from '@/hooks';

export default function App() {
  const [search, setSearch] = useState('');
  const [newTodo, setNewTodo] = useState('');

  const { data: todos, isLoading, isError, error } = useTodos(search);
  const addMutation = useAddTodo();
  const toggleMutation = useToggleTodo();

  const handleAddTodo = () => {
    addMutation.mutate(newTodo, {
      onSuccess: () => setNewTodo(''),
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-2">
            Daftar Tugas
          </h1>
          <p className="text-slate-500">Kelola tugas harian Anda dengan mudah</p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200">
          <div className="p-6 border-b border-slate-200 space-y-4">
            <TodoForm
              value={newTodo}
              onChange={setNewTodo}
              onSubmit={handleAddTodo}
              isLoading={addMutation.isPending}
              error={addMutation.isError ? getErrorMessage(addMutation.error) : undefined}
              onClearError={() => addMutation.reset()}
            />
            <SearchInput value={search} onChange={setSearch} placeholder="Cari tugas..." />
          </div>

          <div className="bg-white min-h-[300px]">
            <TodoList
              todos={todos}
              isLoading={isLoading}
              isError={isError}
              errorMessage={error ? getErrorMessage(error) : undefined}
              onToggle={(id) => toggleMutation.mutate(id)}
              isToggling={toggleMutation.isPending}
            />
          </div>

          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
            <span className="text-xs text-slate-500">{todos?.length || 0} tugas</span>
            {todos?.some((t) => t.completed) && (
              <span className="text-xs text-green-600 font-medium">
                {todos.filter((t) => t.completed).length} selesai
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

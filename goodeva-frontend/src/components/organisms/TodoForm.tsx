import { Plus } from 'lucide-react';
import { Input, Button } from '@/components/atoms';
import { ErrorMessage } from '@/components/molecules';

interface TodoFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    error?: string;
    onClearError?: () => void;
}

export function TodoForm({ value, onChange, onSubmit, isLoading, error, onClearError }: TodoFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        if (error && onClearError) onClearError();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start">
            <div className="flex-1 w-full">
                <Input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Tulis tugas baru..."
                    error={!!error}
                    disabled={isLoading}
                />
                <ErrorMessage message={error || ''} visible={!!error} />
            </div>
            <Button type="submit" isLoading={isLoading} className="w-full sm:w-auto shrink-0">
                <Plus className="h-5 w-5 mr-2" />
                Tambah
            </Button>
        </form>
    );
}

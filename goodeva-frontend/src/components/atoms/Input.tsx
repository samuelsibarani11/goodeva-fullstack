import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Tipe props untuk komponen Input
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

/**
 * Komponen input yang dapat digunakan kembali
 * Mendukung state error dengan styling khusus
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    'w-full pl-4 pr-10 py-3 rounded-xl border focus:ring-2 transition-all outline-none',
                    error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-200',
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

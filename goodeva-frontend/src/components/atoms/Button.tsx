import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

// Tipe props untuk komponen Button
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
}

/**
 * Komponen tombol yang dapat digunakan kembali
 * Mendukung varian primary/secondary dan state loading
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', isLoading, children, disabled, ...props }, ref) => {
        // Styling berdasarkan varian
        const variants = {
            primary:
                'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md hover:shadow-lg',
            secondary:
                'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transition-all active:scale-95 cursor-pointer',
                    variants[variant],
                    className
                )}
                {...props}
            >
                {isLoading ? <Spinner size="sm" /> : children}
            </button>
        );
    }
);

Button.displayName = 'Button';

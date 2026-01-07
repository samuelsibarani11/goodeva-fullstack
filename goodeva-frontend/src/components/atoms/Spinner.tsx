import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipe props untuk komponen Spinner
interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

// Pemetaan ukuran spinner
const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-10 w-10',
};

/**
 * Komponen indikator loading (spinner)
 * Mendukung 3 ukuran: sm, md, lg
 */
export function Spinner({ size = 'md', className }: SpinnerProps) {
    return (
        <Loader2 className={cn('animate-spin', sizeMap[size], className)} />
    );
}

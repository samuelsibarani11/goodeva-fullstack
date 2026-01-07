import { cn } from '@/lib/utils';

// Tipe props untuk komponen ErrorMessage
interface ErrorMessageProps {
    message: string;
    visible: boolean;
}

/**
 * Komponen untuk menampilkan pesan error dengan animasi slide
 * Menggunakan CSS Grid untuk animasi height yang smooth
 */
export function ErrorMessage({ message, visible }: ErrorMessageProps) {
    return (
        <div
            className={cn(
                'grid transition-all duration-300 ease-in-out',
                visible ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
            )}
        >
            <div className="overflow-hidden">
                <p className="text-xs text-red-500 font-medium ml-1">{message}</p>
            </div>
        </div>
    );
}

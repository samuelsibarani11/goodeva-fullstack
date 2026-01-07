import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fungsi utilitas untuk menggabungkan class Tailwind
 * Menggabungkan clsx dan tailwind-merge untuk hasil optimal
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

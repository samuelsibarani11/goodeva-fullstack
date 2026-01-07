import { Search } from 'lucide-react';

// Tipe props untuk komponen SearchInput
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

/**
 * Komponen input pencarian dengan ikon
 * Menampilkan ikon search di sebelah kiri input
 */
export function SearchInput({ value, onChange, placeholder = 'Cari...' }: SearchInputProps) {
    return (
        <div className="relative">
            {/* Ikon Pencarian */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
            </div>
            {/* Input Field */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            />
        </div>
    );
}

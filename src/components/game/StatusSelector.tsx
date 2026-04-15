import type { GameStatus } from '../../types/game';

interface StatusSelectorProps {
    value: GameStatus;
    onChange: (newStatus: GameStatus) => void;
    disabled?: boolean;
}

// mapea los estados a etiquetas
const STATUS_OPTIONS: { value: GameStatus; label: string }[] = [
    { value: 'Wishlist', label: 'Wishlist' },
    { value: 'Backlog', label: 'Backlog' },
    { value: 'Playing', label: 'Currently Playing' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Dropped', label: 'Dropped' },
];

export function StatusSelector({ value, onChange, disabled = false }: StatusSelectorProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="status-select" className="text-sm font-medium text-gray-400">
                Game Status
            </label>
            <select
                id="status-select"
                value={value}
                onChange={(e) => onChange(e.target.value as GameStatus)}
                disabled={disabled}
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
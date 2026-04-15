import type { GameStatus } from '../../types/game';
import { STATUS_LIST } from '../../utils/constants';

interface StatusSelectorProps {
    value: GameStatus;
    onChange: (newStatus: GameStatus) => void;
    disabled?: boolean;
}

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
                {STATUS_LIST.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
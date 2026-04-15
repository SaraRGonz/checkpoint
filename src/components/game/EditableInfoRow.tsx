interface Props {
    label: string;
    isEditing: boolean;
    children: React.ReactNode; // El input/select
    valueDisplay: string | number | undefined; // El texto cuando no editamos
}

export function EditableInfoRow({ label, isEditing, children, valueDisplay }: Props) {
    return (
        <div className="flex justify-between items-center gap-4 border-b border-gray-800/50 pb-2 min-h-10">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}:</span>
            {isEditing ? (
                <div className="grow max-w-50 animate-in zoom-in-95 duration-200">{children}</div>
            ) : (
                <span className="text-sm font-bold text-text text-right">{valueDisplay || 'N/A'}</span>
            )}
        </div>
    );
}
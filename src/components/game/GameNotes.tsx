interface GameNotesProps {
    notes: string;
    onChange: (notes: string) => void;
    isEditing: boolean;
}

export function GameNotes({ notes, onChange, isEditing }: GameNotesProps) {
    return (
        <div className="flex flex-col h-full bg-gray-900/40 p-6 rounded-2xl border border-gray-800 shadow-inner">
            <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-secondary">
                Notas
            </h3>
            
            <textarea
                value={notes}
                onChange={(e) => onChange(e.target.value)}
                readOnly={!isEditing} // Solo lectura si no se está editando
                placeholder={isEditing ? "Escribe aquí tus pensamientos..." : "No hay notas para este juego."}
                className={`grow w-full bg-gray-950/50 border rounded-xl p-4 text-gray-300 resize-none outline-none transition-all min-h-62.5 ${
                    isEditing 
                    ? 'border-primary focus:ring-1 focus:ring-primary focus:border-primary' 
                    : 'border-transparent cursor-default'
                }`}
            />
        </div>
    );
}
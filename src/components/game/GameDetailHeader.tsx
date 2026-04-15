import { Button } from '../ui/Button';

interface Props {
    title: string;
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onDiscard: () => void;
}

export function GameDetailHeader({ title, isEditing, onEdit, onSave, onDiscard }: Props) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-6 gap-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text text-center md:text-left">
                {title}
            </h1>
            
            <div className="flex gap-2">
                {!isEditing ? (
                    <Button onClick={onEdit} variant="secondary">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                        </div>
                    </Button>
                ) : (
                    <>
                        <Button onClick={onSave} variant="primary">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                                </svg>
                                Save changes
                            </div>
                        </Button>
                        <Button onClick={onDiscard} variant="danger">Discard</Button>
                    </>
                )}
            </div>
        </header>
    );
}
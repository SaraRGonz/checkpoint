import { Button } from '../ui/Button';
import { EditIcon, TrashIcon, SaveIcon, CrossIcon } from '../ui/Icons';

interface Props {
    title: string;
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onDiscard: () => void;
    onDelete: () => void;
}

export function GameDetailHeader({ title, isEditing, onEdit, onSave, onDiscard, onDelete }: Props) {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-6 gap-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text text-center md:text-left">
                {title}
            </h1>
            
            <div className="flex gap-2">
                {!isEditing ? (
                    <>
                        <Button onClick={onEdit} variant="secondary">
                            <div className="flex items-center gap-2">
                                <EditIcon className="w-4 h-4" />
                                Edit
                            </div>
                        </Button>
                        
                        <Button onClick={onDelete} variant="danger">
                            <div className="flex items-center gap-2">
                                <TrashIcon className="w-4 h-4" />
                                Delete
                            </div>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={onSave} variant="primary">
                            <div className="flex items-center gap-2">
                                <SaveIcon className="w-4 h-4" />
                                Save
                            </div>
                        </Button>
                        <Button onClick={onDiscard} variant="secondary">
                            <div className="flex items-center gap-2">
                                <CrossIcon className="w-4 h-4" />
                                Discard
                            </div>
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}
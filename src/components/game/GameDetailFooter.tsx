import { formatDate } from '../../utils/formatters';

interface GameDetailFooterProps {
    addedAt?: string;
    updatedAt?: string;
    rawgId?: number;
}

export function GameDetailFooter({ addedAt, updatedAt, rawgId }: GameDetailFooterProps) {
    return (
        <footer className="pt-8 border-t border-gray-800 flex flex-wrap gap-6 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <div>Added: <span className="text-gray-400">{formatDate(addedAt)}</span></div>
            {updatedAt && <div>Updated: <span className="text-gray-400">{formatDate(updatedAt)}</span></div>}
            <a href="https://rawg.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-auto opacity-50">{rawgId && <div className="italic font-normal text-xs tracking-normal">REF: RAWG-{rawgId}</div>}</a>
        </footer>
    );
}

 
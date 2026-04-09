interface ErrorMessageProps {
    message: string;
    code?: string | number; // por si es un texto "ERR_NETWORK" o un número 404
}

export function ErrorMessage({ message, code }: ErrorMessageProps) {
    return (
        <div className="bg-errorbg border-l-4 border-errortext p-4 my-4 rounded-md shadow-sm">
            <div className="flex items-center">
                {/* icono de alerta */}
                <svg className="h-5 w-5 text-errortext mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                
                <div>
                    {/* si se muestra un código se pone en negrita */}
                    {code && <span className="font-bold text-erroraccent mr-2">[{code}]</span>}
                    <span className="text-erroraccent">{message}</span>
                </div>
            </div>
        </div>
    );
}
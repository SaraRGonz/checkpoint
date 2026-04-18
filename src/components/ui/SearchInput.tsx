import { SearchIcon } from './Icons';

interface SearchInputProps {
    value: string;
    onChange: (newValue: string) => void; // cuando el usuario escribe algo, llama a esta función pasándole el texto nuevo. "Void" porque no se espera que devuelva nada
    placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search game...' }: SearchInputProps) { //placeholder por defecto
    return (
        <div className="relative w-full max-w-md">
            {/* div con el icono de la lupa. "pointer-events-none" para que los clicks atraviesen la lupa y se seleccione el input*/}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> 
                <SearchIcon className="h-5 w-5 text-searchinput-icon" />
            </div>
            
            {/* input donde escribir la búsqueda*/}
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-searchinput-bg placeholder-searchinput-placeholder focus:outline-none focus:placeholder-searchinput-focusplaceholder focus:border-searchinput-focusborder sm:text-sm transition duration-150 ease-in-out"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {/* 'e' es el evento nativo del navegador (cuando se teclea algo)
                'e.target' es el elemento HTML que dispara el evento (el <input>)
                'e.target.value' es el texto real y actualizado que hay escrito en el input
                Coge ese texto y se lo pasa a la función 'onChange' para que el padre se entere */ }
        </div>
    );
}
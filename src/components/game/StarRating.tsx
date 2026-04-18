import { StarIcon } from '../ui/Icons'

interface StarRatingProps {
    rating: number;
    maxStars?: number; // por si en algún punto se quieren poner más o menos estrellas
    onChange?: (rating: number) => void; 
    disabled?: boolean; 
}


export function StarRating({ rating, maxStars = 5, onChange, disabled = false }: StarRatingProps) { //  maxStars con valor por defecto de 5
    
    // ({ length: maxStars }) toma el número introducido en maxStars para crear un array vacío con esa longitud
    // (_, i) => i + 1 es una función que recorre el array para rellenarlo ([0,1,2,3,4]) y para que no devuelva una estrella cero devuelve i + 1 ([1, 2, 3, 4, 5])
    const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

    return (
        <div className="flex gap-1 items-center">
            {stars.map((starNumber) => {
                
                // compara el número de estrellas y el rating para saber cuantas hay que pintar
                const isFilled = starNumber <= rating;

                return (
                    <StarIcon
                        key={starNumber}
                        onClick={() => !disabled && onChange?.(starNumber)}
                        className={`w-5 h-5 ${isFilled ? 'text-filledstar fill-current' : 'text-emptystar fill-current'} ${!disabled && onChange ? 'cursor-pointer hover:scale-110' : ''}`}
                    />
                );
            })}
        </div>
    );
}


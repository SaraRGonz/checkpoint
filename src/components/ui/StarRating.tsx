interface StarRatingProps {
    rating: number;
    maxStars?: number; // por si en algún punto se quieren poner más o menos estrellas
}


export function StarRating({ rating, maxStars = 5 }: StarRatingProps) { //  maxStars con valor por defecto de 5
    
    // ({ length: maxStars }) toma el número introducido en maxStars para crear un array vacío con esa longitud
    // (_, i) => i + 1 es una función que recorre el array para rellenarlo ([0,1,2,3,4]) y para que no devuelva una estrella cero devuelve i + 1 ([1, 2, 3, 4, 5])
    const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

    return (
        <div className="flex gap-1 items-center">
            {stars.map((starNumber) => {
                
                // compara el número de estrellas y el rating para saber cuantas hay que pintar
                const isFilled = starNumber <= rating;

                return (
                    <svg
                        key={starNumber} // el key que pide React para identificar cada estrella
                        className={`w-5 h-5 ${isFilled ? 'text-filledstar fill-current' : 'text-emptystar fill-current'}`}
                        xmlns="http://www.w3.org/2000/svg" // donde se define el idioma usado para dibujar el svg
                        viewBox="0 0 24 24" // marca la posición y la dimension
                        stroke="currentColor" // hereda el color que corresponda de className
                        strokeWidth="2" // grosor del trazo
                    >
                        <path 
                        strokeLinecap="round" // redondea las esquinas de la estrella
                        strokeLinejoin="round" 
                        // coordenadas de dibujo
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/> 
                    </svg>
                );
            })}
        </div>
    );
}


import type { SVGProps } from 'react';

// permite que a cualquier icono se le pueda pasar clases de tailwind o propiedades nativas de un svg como onclick
interface IconProps extends SVGProps<SVGSVGElement> {}

export function SearchIcon(props: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
    );
}

export function ChevronDownIcon(props: IconProps) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

export function CheckIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export function LogoIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
            <path d="M6 12h4M8 10v4M15 11v.01M18 13v.01M21 15a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6Z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export function HomeIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function LibraryIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
}

export function WishlistNavIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
            <circle cx="12" cy="12" r="6" />
        </svg>
    );
}

export function SearchNavIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
            <path d="M12 6l6 12H6z" />
        </svg>
    );
}

export function AddGameIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
            <rect x="6" y="6" width="12" height="12" rx="1" />
        </svg>
    );
}

export function StarIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/> 
        </svg>
    );
}

export function PencilIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" {...props}>
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
    );
}

export function EditIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
    );
}

export function TrashIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    );
}

export function SaveIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
        </svg>
    );
}

export function CrossIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
}

export function AlertIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );
}

export function GhostIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M50.3,87.7c-1.1,0-2.2-0.4-3-1.2l-6.4-6.4l-6.4,6.4c-1.7,1.7-4.4,1.7-6,0l-6.4-6.4l-6.4,6.4c-1.7,1.7-4.4,1.7-6,0 c-0.8-0.8-1.2-1.9-1.2-3v-54c0-8.8,7.2-16,16-16h50.7c8.8,0,16,7.2,16,16v54c0,1.1-0.4,2.2-1.2,3c-1.7,1.7-4.4,1.7-6,0l-6.4-6.4 l-6.4,6.4c-1.7,1.7-4.4,1.7-6,0l-6.4-6.4l-6.4,6.4C52.5,87.3,51.4,87.7,50.3,87.7z M25.6,80.5l4.3-4.3c1.7-1.7,4.4-1.7,6,0l6.4,6.4 l6.4-6.4c1.7-1.7,4.4-1.7,6,0l6.4,6.4l6.4-6.4c1.7-1.7,4.4-1.7,6,0l4.3,4.3v-51c0-4.4-3.6-8-8-8H25.6c-4.4,0-8,3.6-8,8v51L25.6,80.5z M35.9,54.1c-4.9,0-8.8-4-8.8-8.8c0-4.9,4-8.8,8.8-8.8s8.8,4,8.8,8.8C44.7,50.1,40.7,54.1,35.9,54.1z M35.9,39.5c-3.2,0-5.8,2.6-5.8,5.8 c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8C41.7,42.1,39.1,39.5,35.9,39.5z M64.3,54.1c-4.9,0-8.8-4-8.8-8.8c0-4.9,4-8.8,8.8-8.8 s8.8,4,8.8,8.8C73.1,50.1,69.2,54.1,64.3,54.1z M64.3,39.5c-3.2,0-5.8,2.6-5.8,5.8c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8 C70.1,42.1,67.5,39.5,64.3,39.5z" />
        </svg>
    );
}

export function SpinnerIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.80101 49.8132 6.66488 46.6163 5.20749 43.0978C3.75011 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.20749 20.9022C6.66488 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80101 17.3837 6.66488 20.9022 5.20749C24.4206 3.75011 28.1917 3 32 3Z" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function PlusIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    );
}

export function HeartIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
    );
}

export function RadarIcon(props: IconProps) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
}
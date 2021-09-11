export interface elemento{
    id: number;
    title: string;
    name?: string;
    body?: string;
    email?: string;
    url?: string;
    thumbnailUrl?: string;
    completed?: boolean;
}
export interface tiposElemento {
    type?: string;
    id: boolean;
    title: boolean;
    name?: boolean;
    body?: boolean;
    email?: boolean;
    url?: boolean;
    thumbnailUrl?: boolean;
    completed?: boolean;
}
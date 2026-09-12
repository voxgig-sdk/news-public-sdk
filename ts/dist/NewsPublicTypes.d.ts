export interface Noticia {
    description: string;
    image: string;
    link: string;
    site_icon: string;
    title: string;
}
export interface NoticiaListMatch {
    all?: boolean;
    limit?: number;
}

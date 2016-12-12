export interface GameList {
    title: string;
    author: string;
    deck: string;
    games?: Array<{
        title: string;
        url: string;
        thumbnailUrl: string;
    }>;
}

export interface ListScore {
    games: { [gameUrl: string]: { score: number } };
    totalScore: number;
}

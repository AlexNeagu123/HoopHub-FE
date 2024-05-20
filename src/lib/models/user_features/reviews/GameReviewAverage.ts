interface GameReviewAverage {
    homeTeamId: number;
    visitorTeamId: number;
    date: string;
    averageRating: number | null;
}

export type { GameReviewAverage }
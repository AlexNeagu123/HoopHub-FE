interface PlayerPerformanceAverage {
    homeTeamId: number;
    visitorTeamId: number;
    date: string;
    playerId: string;
    averageRating: number | null;
    ownRating: number | null;
}

export type { PlayerPerformanceAverage }
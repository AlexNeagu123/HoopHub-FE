interface GameThread {
    id: string;
    homeTeamId: number;
    visitorTeamId: number;
    date: string;
    commentsCount: number;
}

export type { GameThread }
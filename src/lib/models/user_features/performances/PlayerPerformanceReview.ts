import type FanInfo from "../fans/FanInfo";

interface PlayerPerformanceReview {
    homeTeamId: number;
    visitorTeamId: number;
    date: string;
    playerId: string;
    fan: FanInfo | null;
    rating: number | null;
    averageRating: number | null;
}

export type { PlayerPerformanceReview}
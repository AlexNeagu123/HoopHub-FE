import type FanInfo from "../fans/FanInfo";

interface GameReview {
    homeTeamId: number;
    visitorTeamId: number;
    date: string;
    fan: FanInfo | null;
    rating: number | null;
    averageRating: number | null;
    content: string | null;
}

export type { GameReview }
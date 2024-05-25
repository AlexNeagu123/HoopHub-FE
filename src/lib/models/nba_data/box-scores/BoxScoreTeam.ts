import type {BoxScorePlayer} from "$lib/models/nba_data/box-scores/BoxScorePlayer";

interface BoxScoreTeam {
    id: string;
    apiId: number;
    fullName: string;
    abbreviation?: string;
    city?: string;
    conference?: string;
    division?: string;
    imageUrl?: string;
    players: BoxScorePlayer[];
}

export type {BoxScoreTeam};
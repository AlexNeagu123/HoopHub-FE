import type {BoxScorePlayer} from "$lib/models/nba_data/box-scores/BoxScorePlayer";

interface LatestPlayerBoxScore extends BoxScorePlayer {
    date: string;
    ownTeamAbbr: string;
    oppTeamAbbr: string;
    result: string;
    ownTeamId: string;
    oppTeamId: string;
    homeTeamId: number;
    visitorTeamId: number;
}

export type {LatestPlayerBoxScore}
import type {BoxScoreTeam} from "$lib/models/nba_data/box-scores/BoxScoreTeam";

interface GameWithBoxScore {
    date: string;
    season?: number;
    period?: number;
    status: string;
    time: string;
    postseason: boolean;
    homeTeamScore?: number;
    visitorTeamScore?: number;
    homeTeam: BoxScoreTeam;
    visitorTeam: BoxScoreTeam;
}

export type {GameWithBoxScore}
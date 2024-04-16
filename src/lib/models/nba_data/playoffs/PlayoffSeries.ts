import type {Season} from "$lib/models/nba_data/seasons/Season";
import type {Team} from "$lib/models/nba_data/teams/Team";

interface PlayoffSeries {
    season: Season;
    winningTeam: Team;
    losingTeam: Team;
    winningTeamWins: number;
    losingTeamWins: number;
    stage: string;
    winningTeamRank: number;
    losingTeamRank: number;
}

export type {PlayoffSeries}
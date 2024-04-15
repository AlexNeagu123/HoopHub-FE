import type {Season} from "$lib/models/nba_data/seasons/Season";
import type {Team} from "$lib/models/nba_data/teams/Team";

interface Standings {
    season: Season;
    team: Team;
    rank: number;
    overall: string;
    home: string;
    road: string;
    easternRecord: string;
    westernRecord: string;
    teamFullName: string;
    winLossPercentage: string;
    teamPhotoUrl: string;
    teamId: string;
}

export type {Standings}
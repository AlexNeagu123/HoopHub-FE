import type {Team} from "$lib/models/nba_data/teams/Team";

interface Game {
    id: number;
    date: string;
    season: number;
    period: number;
    time: string;
    postseason: boolean;
    homeTeamScore: number;
    visitorTeamScore: number;

    homeTeam: Team;
    visitorTeam: Team;
}

export type {Game}
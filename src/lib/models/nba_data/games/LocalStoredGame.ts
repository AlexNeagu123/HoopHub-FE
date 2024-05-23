import type { Season } from "../seasons/Season";
import type { Team } from "../teams/Team";

interface LocalStoredGame {
    id: string;
    date: Date;
    homeTeam: Team;
    visitorTeam: Team;
    season?: Season;
    homeTeamScore: number;
    visitorTeamScore: number;
    status: string;
    period: number;
    time: string;
    postseason: boolean;
}

export type { LocalStoredGame }
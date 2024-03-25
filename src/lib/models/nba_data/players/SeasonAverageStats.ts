import type { Team } from "$lib/models/nba_data/teams/Team";

interface SeasonAverageStats {
    pts: number;
    ast: number;
    turnover: number;
    pf: number;
    fga: number;
    fgm: number;
    fta: number;
    ftm: number;
    fg3a: number;
    fg3m: number;
    reb: number;
    oReb: number;
    dReb: number;
    stl: number;
    blk: number;
    fgPct: number;
    fg3Pct: number;
    ftPct: number;
    min: string;
    gamesPlayed: number;
    playerId: number;
    season: number;
    team: Team;
}

export type {SeasonAverageStats}
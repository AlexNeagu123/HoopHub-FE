import type { Team } from "$lib/models/nba_data/teams/Team";

interface SeasonAverageStats {
    pts: number;
    ast: number;
    turnover: number;
    pf: number;
    fga: number;
    fgm: number;
    fgp: number;
    fta: number;
    ftm: number;
    ftp: number;
    fg3a: number;
    fg3m: number;
    fg3p: number;
    reb: number;
    oreb: number;
    dreb: number;
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
    teamStr: string;
    seasonStr: string;
    teamId: string;
}

export type {SeasonAverageStats}
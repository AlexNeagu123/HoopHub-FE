import type { Team } from "$lib/models/nba_data/teams/Team";

interface SeasonAverageStats {
    Pts: number;
    Ast: number;
    Turnover: number;
    Pf: number;
    Fga: number;
    Fgm: number;
    Fta: number;
    Ftm: number;
    Fg3a: number;
    Fg3m: number;
    Reb: number;
    Oreb: number;
    Dreb: number;
    Stl: number;
    Blk: number;
    FgPct: number;
    Fg3Pct: number;
    FtPct: number;
    Min: string;
    GamesPlayed: number;
    PlayerId: number;
    Season: number;
    Team: Team | null;
}

export type {SeasonAverageStats}
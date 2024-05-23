import type { LocalStoredGame } from "../games/LocalStoredGame";
import type { Player } from "../players/Player";
import type { Team } from "../teams/Team";

interface LocalStoredBoxScoresDto {
    id: string;
    game: LocalStoredGame;
    player: Player;
    team: Team;
    min?: string;
    fgm: number;
    fga: number;
    fgPct: number;
    fg3m: number;
    fg3a: number;
    fg3Pct: number;
    ftm: number;
    fta: number;
    ftPct: number;
    oreb: number;
    dreb: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    turnover: number;
    pf: number;
    pts: number;
}

export type { LocalStoredBoxScoresDto}
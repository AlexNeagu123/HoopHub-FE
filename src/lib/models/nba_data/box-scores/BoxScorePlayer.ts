import type {Player} from "$lib/models/nba_data/players/Player";

interface BoxScorePlayer {
    min: string;
    fgm?: number;
    fga?: number;
    fgPct?: number;
    fg3m?: number;
    fg3a?: number;
    fg3Pct?: number;
    ftm?: number;
    fta?: number;
    ftPct?: number;
    oreb?: number;
    dreb?: number;
    reb: number;
    ast?: number;
    stl?: number;
    blk?: number;
    turnover?: number;
    pf?: number;
    pts: number;
    player?: Player;

    playerFullName?: string;
    playerImageUrl?: string;
}

export type {BoxScorePlayer}
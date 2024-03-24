import type {Season} from "$lib/models/nba_data/seasons/Season";

interface TeamBio {
    Season: Season | null;
    WinCount: number;
    LossCount: number;
    WinLossRatio: number;
    Finish: string;
    Srs: number;
    Pace: number;
    RelPace: number;
    ORtg: number;
    DRtg: number;
    Playoffs: string;
}

export type {TeamBio}
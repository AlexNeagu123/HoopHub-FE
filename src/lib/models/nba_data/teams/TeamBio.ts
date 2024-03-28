import type {Season} from "$lib/models/nba_data/seasons/Season";

interface TeamBio {
    season: Season;
    winCount: number;
    lossCount: number;
    winLossRatio: number;
    finish: string;
    srs: number;
    pace: number;
    relPace: number;
    oRtg: number;
    dRtg: number;
    playoffs: string;
    seasonStr: string;
}

export type {TeamBio}
import type {PlayoffSeries} from "$lib/models/nba_data/playoffs/PlayoffSeries";

interface GroupedPlayoffSeries {
    stageGrouping: { [key: string]: PlayoffSeries[] };
}

export type {GroupedPlayoffSeries}
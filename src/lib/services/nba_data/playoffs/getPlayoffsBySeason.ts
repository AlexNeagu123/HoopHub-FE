import type {Response} from "$lib/models/common/Response"
import type {GroupedPlayoffSeries} from "$lib/models/nba_data/playoffs/GroupedPlayoffSeries";
import {axiosInstance} from "$lib/constants";

export default async function getPlayoffsBySeason(season: number): Promise<GroupedPlayoffSeries> {
    const axiosRes =
        await axiosInstance.get<Response<GroupedPlayoffSeries>>(`nba-data/playoffs?season=${season}`);
    const response = axiosRes.data;
    return response.data;
}
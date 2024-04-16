import type {Response} from "$lib/models/common/Response"
import axios from 'axios'
import type {GroupedPlayoffSeries} from "$lib/models/nba_data/playoffs/GroupedPlayoffSeries";

export default async function getPlayoffsBySeason(season: number): Promise<GroupedPlayoffSeries> {
    const axiosRes =
        await axios.get<Response<GroupedPlayoffSeries>>(`nba-data/playoffs?season=${season}`);
    const response = axiosRes.data;
    return response.data;
}
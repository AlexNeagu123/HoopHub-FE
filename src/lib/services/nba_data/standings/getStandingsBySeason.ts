import type {Response} from "$lib/models/common/Response"
import type {Standings} from "$lib/models/nba_data/standings/Standings";
import {axiosInstance} from "$lib/constants";

export default async function getStandingsBySeason(season: number): Promise<Standings[]> {
    const axiosRes =
        await axiosInstance.get<Response<Standings[]>>(`nba-data/standings?season=${season}`);
    const response = axiosRes.data;
    return response.data;
}
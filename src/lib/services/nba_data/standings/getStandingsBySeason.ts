import type {Response} from "$lib/models/common/Response"
import axios from 'axios'
import type {Standings} from "$lib/models/nba_data/standings/Standings";

export default async function getStandingsBySeason(season: number): Promise<Standings[]> {
    const axiosRes =
        await axios.get<Response<Standings[]>>(`nba-data/standings?season=${season}`);
    const response = axiosRes.data;
    return response.data;
}
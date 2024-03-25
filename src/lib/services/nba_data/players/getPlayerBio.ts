import type {Response} from "$lib/models/common/Response"
import axios from 'axios'
import type {Player} from "$lib/models/nba_data/players/Player";

export default async function getPlayerBio(id: string, startSeason: number, endSeason: number): Promise<Player> {
    const axiosRes =
        await axios.get<Response<Player>>(`nba-data/players/bio/${id}?startSeason=${startSeason}&endSeason=${endSeason}`);
    const response = axiosRes.data;
    return response.data;
}
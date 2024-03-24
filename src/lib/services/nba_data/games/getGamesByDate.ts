import type {Response} from "$lib/models/common/Response"
import axios from 'axios'
import type {Game} from "$lib/models/nba_data/games/Game";

export default async function getGamesByDate(date: string): Promise<Game[]> {
    const axiosRes =
        await axios.get<Response<Game[]>>(`nba-data/games?date=${date}`);
    const response = axiosRes.data;
    return response.data;
}
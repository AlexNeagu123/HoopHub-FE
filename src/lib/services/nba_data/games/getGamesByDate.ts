import type {Response} from "$lib/models/common/Response"
import type {Game} from "$lib/models/nba_data/games/Game";
import {axiosInstance} from "$lib/constants";

export default async function getGamesByDate(date: string): Promise<Game[]> {
    const axiosRes =
        await axiosInstance.get<Response<Game[]>>(`nba-data/games?date=${date}`);
    const response = axiosRes.data;
    return response.data;
}
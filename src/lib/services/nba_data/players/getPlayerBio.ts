import type {Response} from "$lib/models/common/Response"
import type {Player} from "$lib/models/nba_data/players/Player";
import {axiosInstance} from "$lib/constants";

export default async function getPlayerBio(id: string, startSeason: number, endSeason: number): Promise<Player> {
    console.log(id);
    const axiosRes =
        await axiosInstance.get<Response<Player>>(`nba-data/players/bio/${id}?startSeason=${startSeason}&endSeason=${endSeason}`);
    const response = axiosRes.data;
    return response.data;
}
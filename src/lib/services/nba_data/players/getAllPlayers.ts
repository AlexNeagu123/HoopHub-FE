import type { Response } from "$lib/models/common/Response"
import type { Player } from "$lib/models/nba_data/players/Player";
import { axiosInstance } from "$lib/constants";

export default async function getAllPlayers(): Promise<Player[]> {
    const axiosRes =
        await axiosInstance.get<Response<Player[]>>(`nba-data/players/all`);
    const response = axiosRes.data;
    return response.data;
}
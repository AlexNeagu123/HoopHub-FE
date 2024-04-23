import type {Response} from "$lib/models/common/Response"
import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
import {axiosInstance} from "$lib/constants";

export default async function getLatestBoxScoresByTeam(teamId: string): Promise<GameWithBoxScore[]> {
    const axiosRes =
        await axiosInstance.get<Response<GameWithBoxScore[]>>(`nba-data/games/${teamId}`);
    const response = axiosRes.data;
    return response.data;
}
import type {Response} from "$lib/models/common/Response"
import axios from 'axios'
import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";

export default async function getLatestBoxScoresByTeam(teamId: string): Promise<GameWithBoxScore[]> {
    const axiosRes =
        await axios.get<Response<GameWithBoxScore[]>>(`nba-data/games/${teamId}`);
    const response = axiosRes.data;
    return response.data;
}
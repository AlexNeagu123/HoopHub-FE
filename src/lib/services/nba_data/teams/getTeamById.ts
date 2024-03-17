import type {Team} from "$lib/models/nba_data/Team"
import type {Response} from "$lib/models/common/Response"
import axios from 'axios'

declare const API_PATH: string;

async function getTeamById(id: string): Promise<Team> {
    const axiosRes = await axios.get<Response<Team>>(`${API_PATH}nba-data/teams/${id}`);
    const response = axiosRes.data;
    return response.data;
}

export {getTeamById}
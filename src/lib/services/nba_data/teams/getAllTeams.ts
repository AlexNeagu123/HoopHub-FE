import type {Team} from "$lib/models/nba_data/Team"
import type {Response} from "$lib/models/common/Response"
import axios from 'axios'

async function getAllTeams(): Promise<Team[]> {
    const axiosRes = await axios.get<Response<Team[]>>('nba-data/teams');
    const response = axiosRes.data;
    return response.data;
}

export default getAllTeams;
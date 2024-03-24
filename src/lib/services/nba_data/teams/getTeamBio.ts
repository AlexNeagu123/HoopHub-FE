import type {Team} from "$lib/models/nba_data/teams/Team"
import type {Response} from "$lib/models/common/Response"
import axios from 'axios'

export default async function getTeamBio(id: string): Promise<Team> {
    const axiosRes = await axios.get<Response<Team>>(`nba-data/teams/bio/${id}`);
    const response = axiosRes.data;
    return response.data;
}
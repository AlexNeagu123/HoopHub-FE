import type {PageLoad} from './$types';
import type {Team} from "$lib/models/nba_data/teams/Team";
import getTeamById from "$lib/services/nba_data/teams/getTeamById";


export const load: PageLoad = async ({params}) => {
    const team: Team = await getTeamById(params.id);
    return {team}
};
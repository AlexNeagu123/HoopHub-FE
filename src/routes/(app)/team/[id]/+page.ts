import type {PageLoad} from './$types';
import getTeamById from "$lib/services/nba_data/teams/getTeamById";
import type {Team} from "$lib/models/nba_data/teams/Team";

export const load: PageLoad = async ({params}) => {
    const team: Team = await getTeamById(params.id);
    return {team}
};
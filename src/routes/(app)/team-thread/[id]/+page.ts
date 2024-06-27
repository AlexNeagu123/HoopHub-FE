import getTeamById from "$lib/services/nba_data/teams/getTeamById";
import getTeamThreadById from "$lib/services/user_features/threads/getTeamThreadById"
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const [teamThread, team] = await Promise.all([
        getTeamThreadById(params.id),
        getTeamById((await getTeamThreadById(params.id)).teamId)
    ]);

    return { teamThread, team };
}




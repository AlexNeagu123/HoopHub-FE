import type { Team } from "$lib/models/nba_data/teams/Team";
import type { TeamThread } from "$lib/models/user_features/threads/TeamThread";
import getTeamById from "$lib/services/nba_data/teams/getTeamById";
import getTeamThreadById from "$lib/services/user_features/threads/getTeamThreadById"
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const teamThread: TeamThread = await getTeamThreadById(params.id);
    const team: Team = await getTeamById(teamThread.teamId);
    return { teamThread, team }
}
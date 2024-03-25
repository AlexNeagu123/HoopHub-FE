import type {PageLoad} from './$types';
import type {Team} from "$lib/models/nba_data/teams/Team";
import getTeamBio from "$lib/services/nba_data/teams/getTeamBio";

export const load: PageLoad = async ({params}) => {
    const team: Team = await getTeamBio(params.id);
    team.teamBio.sort((a, b) => {
        return b.season.seasonPeriod.localeCompare(a.season.seasonPeriod);
    })
    return {team}
};
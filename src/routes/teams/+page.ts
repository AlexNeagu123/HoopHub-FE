import type { PageLoad } from './$types';
import {getAllTeams} from "$lib/services/nba_data/teams/getAllTeams";
export const load: PageLoad = async () => {
    const teams = await getAllTeams();
    return {teams}
};
import type {PageLoad} from './$types';
import getAllTeams from "$lib/services/nba_data/teams/getAllTeams";
import type {Team} from "$lib/models/nba_data/teams/Team";

export const load: PageLoad = async () => {
    const teams: Team[] = await getAllTeams();
    return {teams}
};
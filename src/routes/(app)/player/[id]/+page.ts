import type { PageLoad } from './$types';
import type { Player } from "$lib/models/nba_data/players/Player";
import getPlayerBio from "$lib/services/nba_data/players/getPlayerBio";
import { SeasonConstants } from "$lib/constants";
import getAllPlayers from '$lib/services/nba_data/players/getAllPlayers';

export const load: PageLoad = async ({ params }) => {
    const [player, allPlayers]: [Player, Player[]] = await Promise.all([
        getPlayerBio(params.id, SeasonConstants.currentSeason, SeasonConstants.currentSeason + 1),
        getAllPlayers()
    ]);

    return { player, allPlayers };
};

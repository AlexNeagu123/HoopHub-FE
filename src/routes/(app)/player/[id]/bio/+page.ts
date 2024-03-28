import type {PageLoad} from './$types';
import getPlayerBio from "$lib/services/nba_data/players/getPlayerBio";
import {PlayerConstants, SeasonConstants} from "$lib/constants";
import type {Player} from "$lib/models/nba_data/players/Player";

export const load: PageLoad = async ({params}) => {
    const player: Player = await getPlayerBio(params.id,SeasonConstants.currentSeason - PlayerConstants.seasonGroupSize + 1,
        SeasonConstants.currentSeason + 1);
    player.seasonAverageStats.sort((a, b) => b.season - a.season);
    return {player}
};
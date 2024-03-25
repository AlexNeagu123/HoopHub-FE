import type {PageLoad} from './$types';
import type {Player} from "$lib/models/nba_data/players/Player";
import getPlayerBio from "$lib/services/nba_data/players/getPlayerBio";
import {SeasonConstants} from "$lib/constants";

export const load: PageLoad = async ({params}) => {
    const player: Player = await getPlayerBio(params.id, SeasonConstants.currentSeason, SeasonConstants.currentSeason + 1);
    return {player}
};
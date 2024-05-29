import type { PageLoad } from './$types';
import getFanInfoById from "$lib/services/user_features/fans/getFanInfoById";
import type FanInfo from "$lib/models/user_features/fans/FanInfo";
import type { Team } from "$lib/models/nba_data/teams/Team";
import getTeamById from "$lib/services/nba_data/teams/getTeamById";
import getAllTeams from "$lib/services/nba_data/teams/getAllTeams";
import ProfilePageInfo from "$lib/models/user_features/fans/ProfilePageInfo";
import getAllActivePlayers from '$lib/services/nba_data/players/getAllActivePlayers';
import getPlayersFollowed from '$lib/services/user_features/followings/getPlayersFollowed';
import getTeamsFollowed from '$lib/services/user_features/followings/getTeamsFollowed';

export const load: PageLoad = async ({ params }) => {
    const pageFanInfo: FanInfo = await getFanInfoById(params.id);
    let favouriteTeam: Team | null = null;
    if (pageFanInfo.favouriteTeamId !== null) {
        favouriteTeam = await getTeamById(pageFanInfo.favouriteTeamId);
    }

    const availableTeams = await getAllTeams();
    const allActivePlayers = await getAllActivePlayers();
    const profilePageInfo = new ProfilePageInfo(pageFanInfo, favouriteTeam, availableTeams);

    const pagePlayerFollows = await getPlayersFollowed(params.id);
    const pageTeamFollows = await getTeamsFollowed(params.id);

    return { profilePageInfo, availableTeams, allActivePlayers, pagePlayerFollows, pageTeamFollows }
};
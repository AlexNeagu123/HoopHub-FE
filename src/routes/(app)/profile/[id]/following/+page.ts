import type { PageLoad } from './$types';
import getFanInfoById from "$lib/services/user_features/fans/getFanInfoById";
import type FanInfo from "$lib/models/user_features/fans/FanInfo";
import type { Team } from "$lib/models/nba_data/teams/Team";
import getTeamById from "$lib/services/nba_data/teams/getTeamById";
import getAllTeams from "$lib/services/nba_data/teams/getAllTeams";
import ProfilePageInfo from "$lib/models/user_features/fans/ProfilePageInfo";
import getPlayersFollowed from '$lib/services/user_features/followings/getPlayersFollowed';
import getTeamsFollowed from '$lib/services/user_features/followings/getTeamsFollowed';
import getAllPlayers from '$lib/services/nba_data/players/getAllPlayers';

export const load: PageLoad = async ({ params }) => {
    const pageFanInfoPromise = getFanInfoById(params.id);
    const availableTeamsPromise = getAllTeams();
    const pagePlayerFollowsPromise = getPlayersFollowed(params.id);
    const pageTeamFollowsPromise = getTeamsFollowed(params.id);
    const allPlayersPromise = getAllPlayers();

    const pageFanInfo: FanInfo = await pageFanInfoPromise;

    let favouriteTeamPromise: Promise<Team | null> = Promise.resolve(null);
    if (pageFanInfo.favouriteTeamId !== null) {
        favouriteTeamPromise = getTeamById(pageFanInfo.favouriteTeamId);
    }

    const [
        favouriteTeam,
        availableTeams,
        pagePlayerFollows,
        pageTeamFollows,
        allPlayers
    ] = await Promise.all([
        favouriteTeamPromise,
        availableTeamsPromise,
        pagePlayerFollowsPromise,
        pageTeamFollowsPromise,
        allPlayersPromise
    ]);

    const profilePageInfo = new ProfilePageInfo(pageFanInfo, favouriteTeam, availableTeams);

    return {
        profilePageInfo,
        availableTeams,
        pagePlayerFollows,
        pageTeamFollows,
        allPlayers
    };
};

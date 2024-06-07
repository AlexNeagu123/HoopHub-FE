import FanInfo from "$lib/models/user_features/fans/FanInfo";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { PageLoad } from './$types';
import getFanInfo from "$lib/services/user_features/fans/getFanInfo";
import { authToken } from "$lib/stores/auth.store";
import { get } from "svelte/store";
import getNotifications from "$lib/services/user_features/notifications/getNotifications";
import { DynamicPaginationThresholds } from "$lib/constants";
import type NotificationModel from "$lib/models/user_features/notifications/NotificationModel";
import type { PlayerFollowEntry } from "$lib/models/user_features/followings/PlayerFollowEntry";
import getPlayersFollowed from "$lib/services/user_features/followings/getPlayersFollowed";
import type { TeamFollowEntry } from "$lib/models/user_features/followings/TeamFollowEntry";
import getTeamsFollowed from "$lib/services/user_features/followings/getTeamsFollowed";
import getAllPlayers from "$lib/services/nba_data/players/getAllPlayers";


export const load: PageLoad = async () => {
    let fanInfo = new FanInfo();
    let unreadNotificationsCount = 0;
    let unreadNotifications: NotificationModel[] = [];
    let allNotifications: NotificationModel[] = [];
    let playerFollows: PlayerFollowEntry[] = [];
    let teamFollows: TeamFollowEntry[] = [];

    if (get(authToken)) {
        fanInfo = await getFanInfo();

        const [
            unreadNotificationsResponse,
            allNotificationsResponse,
            retPlayerFollows,
            retTeamFollows,
        ] = await Promise.all([
            getNotifications(1, DynamicPaginationThresholds.NotificationsThreshold, true),
            getNotifications(1, DynamicPaginationThresholds.NotificationsThreshold, false),
            getPlayersFollowed(),
            getTeamsFollowed(),
        ]);

        playerFollows = retPlayerFollows;
        teamFollows = retTeamFollows;
        unreadNotificationsCount = unreadNotificationsResponse.totalRecords;
        unreadNotifications = unreadNotificationsResponse.data;
        allNotifications = allNotificationsResponse.data;
    }

    const allPlayers = await getAllPlayers();
    return { fanInfo,  allPlayers, unreadNotificationsCount, unreadNotifications, allNotifications, playerFollows, teamFollows }
};
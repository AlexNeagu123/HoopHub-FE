import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { TeamFollowEntry } from "$lib/models/user_features/followings/TeamFollowEntry";

export default async function getTeamsFollowed(): Promise<TeamFollowEntry[]> {
    const axiosRes = await axiosInstance.get<Response<TeamFollowEntry[]>>(`user-features/team-follows`);
    const response = axiosRes.data;
    return response.data;
}
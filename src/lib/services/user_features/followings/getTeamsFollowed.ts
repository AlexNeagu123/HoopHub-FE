import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type { TeamFollowEntry } from "$lib/models/user_features/followings/TeamFollowEntry";

export default async function getTeamsFollowed(fanId: string | null = null): Promise<TeamFollowEntry[]> {
    const url = fanId ? `user-features/team-follows?FanId=${fanId}` : `user-features/team-follows`;
    const axiosRes = await axiosInstance.get<Response<TeamFollowEntry[]>>(`${url}`);
    const response = axiosRes.data;
    return response.data;
}
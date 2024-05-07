import type {PagedResponse} from "$lib/models/common/Response"
import {axiosInstance} from "$lib/constants";
import type {TeamThread} from "$lib/models/user_features/threads/TeamThread";

export default async function getTeamThreadsPaged(page: number, pageSize: number, teamId: string, areOwn: boolean = false) {
    const axiosRes = await axiosInstance.get<PagedResponse<TeamThread[]>>(
        `user-features/team-threads?Page=${page}&PageSize=${pageSize}&TeamId=${teamId}&AreOwn=${areOwn}`);
    const response = axiosRes.data;
    return response.data;
}
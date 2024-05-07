import type {PagedResponse} from "$lib/models/common/Response"
import {axiosInstance} from "$lib/constants";
import type {TeamThread} from "$lib/models/user_features/threads/TeamThread";

export default async function getTeamThreadsByUserPaged(page: number, pageSize: number, fanId: string) {
    const axiosRes = await axiosInstance.get<PagedResponse<TeamThread[]>>(
        `user-features/team-threads/fan?Page=${page}&PageSize=${pageSize}&FanId=${fanId}`);
    const response = axiosRes.data;
    return response.data;
}
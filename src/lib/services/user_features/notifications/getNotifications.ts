import { axiosInstance } from "$lib/constants";
import type { PagedResponse } from "$lib/models/common/Response";
import type NotificationModel from "$lib/models/user_features/notifications/NotificationModel";

export default async function getNotifications(page: number, pageSize: number, onlyUnread: boolean): Promise<PagedResponse<NotificationModel[]>> {
    const axiosRes = await axiosInstance.get<PagedResponse<NotificationModel[]>>(`user-features/notifications?Page=${page}&PageSize=${pageSize}&OnlyUnread=${onlyUnread}`);
    const response = axiosRes.data;
    return response;
}
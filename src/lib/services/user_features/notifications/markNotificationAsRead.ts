import { axiosInstance } from "$lib/constants";
import type { Response } from "$lib/models/common/Response";
import type NotificationModel from "$lib/models/user_features/notifications/NotificationModel";

export default async function markNotificationAsRead(id: string): Promise<NotificationModel> {
    const axiosRes = await axiosInstance.post<Response<NotificationModel>>(
        `user-features/notifications/${id}`
    );

    const response = axiosRes.data;
    return response.data;
}
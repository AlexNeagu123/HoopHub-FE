import type FanInfo from "$lib/models/user_features/fans/FanInfo";
import type {Response} from "$lib/models/common/Response"
import {axiosInstance} from "$lib/constants";

export default async function getFanInfoById(id: string) {
    const axiosRes = await axiosInstance.get<Response<FanInfo>>(`user-features/fans?FanId=${id}`);
    const response = axiosRes.data;
    return response.data;
}
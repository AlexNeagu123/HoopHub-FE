import type FanInfo from "$lib/models/user_features/fans/FanInfo";
import type {Response} from "$lib/models/common/Response"
import {axiosInstance} from "$lib/constants";

export default async function getFanInfo() {
    const axiosRes = await axiosInstance.get<Response<FanInfo>>(`user-features/fans`);
    const response = axiosRes.data;
    return response.data;
}
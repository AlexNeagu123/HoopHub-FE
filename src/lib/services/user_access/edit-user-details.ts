import axios from 'axios'
import type { Response } from "$lib/models/common/Response";
import type { UserDto } from '$lib/models/user_access/UserDto';
import { axiosInstance } from '$lib/constants';

export default async function editUserDetails(username: string | null, isLicensed: boolean): Promise<Response<UserDto>> {
    const payload = {
        username,
        isLicensed
    };

    const axiosRes = await axiosInstance.patch<Response<UserDto>>(`user-details`, payload,
        { validateStatus: (status: number) => (status >= 200 && status < 300) || status === 401 || status === 400 });

    return axiosRes.data;
}
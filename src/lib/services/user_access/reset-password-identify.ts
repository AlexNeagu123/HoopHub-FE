import axios from 'axios'
import type { BaseResponse } from "$lib/models/common/BaseResponse";
import { axiosInstance } from '$lib/constants';

export default async function resetPasswordIdentify(email: string | null): Promise<BaseResponse> {
    const url = email === null ? 'reset-password' : `reset-password?email=${email}`;
    const axiosRes = await axiosInstance.post<BaseResponse>(`${url}`, {},
        { validateStatus: (status: number) => (status >= 200 && status < 300) || status === 401 || status === 400 });

    return axiosRes.data;
}
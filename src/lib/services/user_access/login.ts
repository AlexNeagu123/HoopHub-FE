import type {Response} from "$lib/models/common/Response"

import axios from 'axios'
import LoginModel from "$lib/models/user_access/LoginModel";

export default async function login(userData: LoginModel): Promise<Response<string>> {
    const axiosRes = await axios.post<Response<string>>('login', userData,
        { validateStatus: (status) => (status >= 200 && status < 300) || status === 401 });
    return axiosRes.data;
}
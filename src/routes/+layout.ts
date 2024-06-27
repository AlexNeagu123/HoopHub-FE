import { env } from '$env/dynamic/public'

export const ssr = false;

import axios from "axios";

axios.defaults.baseURL = `${env.PUBLIC_BACKEND_URL}/api/v1/`;

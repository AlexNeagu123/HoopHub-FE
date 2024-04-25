import FanInfo from "$lib/models/user_features/fans/FanInfo";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type {PageLoad} from './$types';
import getFanInfo from "$lib/services/user_features/fans/getFanInfo";
import {authToken} from "$lib/stores/auth.store";
import {get} from "svelte/store";


export const load: PageLoad = async () => {
    let fanInfo = new FanInfo();
    if (get(authToken)) {
        fanInfo = await getFanInfo();
    }
    return {fanInfo}
};
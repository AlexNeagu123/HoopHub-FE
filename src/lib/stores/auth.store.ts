import {writable} from "svelte/store";
import CurrentUser from "$lib/models/user_access/CurrentUser";
import {LocalStorageKeys} from "$lib/constants";
import {storeToken, storeUserDetails} from "$lib/utils/auth-utils";

export const currentUser = writable<CurrentUser>(new CurrentUser())
export const authToken = writable<string>("");

const token = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);
if (token) {
    storeToken(token);
    storeUserDetails(token);
}
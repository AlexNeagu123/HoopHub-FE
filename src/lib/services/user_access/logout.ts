import {authToken, currentUser} from "$lib/stores/auth.store";
import CurrentUser from "$lib/models/user_access/CurrentUser";

export default function logout(): void {
    authToken.set('');
    currentUser.set(new CurrentUser());
    localStorage.removeItem('authToken');
}
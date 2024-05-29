import {authToken, currentUser} from "$lib/stores/auth.store";
import CurrentUser from "$lib/models/user_access/CurrentUser";
import JwtParser from "$lib/utils/jwt-parser";

export function storeToken(token: string): void {
    localStorage.setItem('authToken', token);
    authToken.set(token);
}

export function removeToken(): void {
    localStorage.removeItem('authToken');
    authToken.set("");
}

export function extractLoggedUserInfo(claims: { [key: string]: string }): CurrentUser {
    return {
        isLoggedIn: true,
        userId: claims['nameid'],
        userRole: claims['role'],
        userName: claims['unique_name'],
        tokenExpTime: Number(claims['exp'])
    };
}


export function storeUserDetails(token: string) {
    const jwtParser = new JwtParser(token);
    const claims = jwtParser.parseClaimsFromJwt();
    const loggedUserInfo = extractLoggedUserInfo(claims);
    currentUser.set(loggedUserInfo);
}

import { jwtDecode } from "jwt-decode";

export default class JwtParser {
    public token: string;

    public constructor(token: string) {
        this.token = token;
    }

    public parseClaimsFromJwt(): { [key: string]: string } {
        const tokenParts = this.token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid JWT token format');
        }
        return JSON.parse(atob(tokenParts[1]));
    }

    public isJwtExpired() {
        const decodedToken: { exp: number } = jwtDecode(this.token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            return true;
        }
        return false;
    }
}

export default class JWTParser {
    public token: string;
    public constructor(token: string) {
        this.token = token;
    }

    public parseClaimsFromJwt(): { [key: string]: string} {
        const tokenParts = this.token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Invalid JWT token format');
        }
        return JSON.parse(atob(tokenParts[1]));
    }
}
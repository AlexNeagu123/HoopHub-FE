export function truncateString(str: string, length: number): string {
    return str.length > length ? str.substring(0, length) + "..." : str;
}
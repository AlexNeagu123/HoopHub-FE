export function seasonFromIntToStr(season: number) {
    const nextSeason = season + 1;
    return `${season}-${nextSeason.toString().substring(2, 4)}`;
}

export function seasonFromStrToInt(season: string) {
    return Number(season.split('-')[0]);
}
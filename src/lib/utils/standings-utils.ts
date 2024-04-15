export function seasonFromIntToStr(season: number) {
    const nextSeason = season + 1;
    return `${season}-${nextSeason.toString().substring(2, 4)}`;
}

export function seasonFromStrToInt(season: string) {
    return Number(season.split('-')[0]);
}

export function fromOverallStrToPercentage(overall: string) {
    const wins: number = Number(overall.split("-")[0]);
    const losses: number = Number(overall.split("-")[1]);
    return (wins / (wins + losses)).toFixed(3).substring(1);
}
import type {BoxScorePlayer} from "$lib/models/nba_data/box-scores/BoxScorePlayer";

export function completeStats(playerGameStats: BoxScorePlayer[]) {
    playerGameStats.forEach(stat => {
        const roundToOneDecimal = (value: number) => parseFloat(value.toFixed(1));
        const convertToPercent = (value: number | undefined) => {
            if (!value) {
                return 0;
            }
            return roundToOneDecimal(value * 100);
        }

        const propertiesToRound: (keyof BoxScorePlayer)[]
            = ['pts', 'reb', 'blk', 'stl', 'ast', 'fg3m', 'fg3a', 'fga', 'fgm', 'fta', 'ftm', 'turnover'];

        propertiesToRound.forEach((property: keyof BoxScorePlayer) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            stat[property] = roundToOneDecimal(stat[property]);
        });

        stat.fgPct = convertToPercent(stat.fgPct);
        stat.fg3Pct = convertToPercent(stat.fg3Pct);
        stat.ftPct = convertToPercent(stat.ftPct);
    });

    playerGameStats.sort((a, b) => b.min.localeCompare(a.min));
}

/**
 *
 * @param playerGameStats The player list with the statistics associated
 * @param prop The property to aggregate (should be a valid key of the object and the value should be a number)
 */
export function aggregateProperty(playerGameStats: BoxScorePlayer[], prop: string) {
    let aggregatedValue: number = 0;
    playerGameStats.forEach(p => {
        if (prop in p) {
            aggregatedValue += p[prop];
        }
    });
    return aggregatedValue;
}

/**
 *
 * @param playerGameStats The player list with the statistics associated
 * @param propM The property to aggregate the numerator
 * @param propA The property to aggregate the denominator
 */
export function aggregatePercentage(playerGameStats: BoxScorePlayer[], propM: string, propA: string) {
    const numerator = aggregateProperty(playerGameStats, propM);
    const denominator = aggregateProperty(playerGameStats, propA);
    return Number((numerator / denominator * 100).toFixed(1));
}

/**
 * @param playerGameStats The player list with the statistics associated
 * @param prop The property to maximize (should be a valid key of the object and the value should be a number)
 */
export function findMaxByProperty(playerGameStats: BoxScorePlayer[], prop: string) {
    let maxIndex = 0, maxVal = -1;
    playerGameStats.forEach((p, index) => {
            if (prop in p && typeof p[prop] === "number" && p[prop] > maxVal) {
                maxVal = p[prop];
                maxIndex = index;
            }
        }
    );
    return maxIndex;
}
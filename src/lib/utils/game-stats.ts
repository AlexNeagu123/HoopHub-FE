import type { AdvancedStatsEntry } from "$lib/models/nba_data/box-scores/AdvancedStatsEntry";
import type {BoxScorePlayer} from "$lib/models/nba_data/box-scores/BoxScorePlayer";
import type { LatestPlayerBoxScore } from "$lib/models/nba_data/box-scores/LatestPlayerBoxScore";

const roundToOneDecimal = (value: number) => parseFloat(value.toFixed(1));

const convertToPercent = (value: number | undefined) => {
    if (!value) {
        return 0;
    }
    if(value * 100 > 100) {
        return value;
    }
    return roundToOneDecimal(value * 100);
}

export function completeAdvancedStats(advancedStatsEntries: AdvancedStatsEntry[], homePlayers: BoxScorePlayer[], visitorPlayers: BoxScorePlayer[]) {
    const findPlayer = (playerId: string, players: BoxScorePlayer[]): BoxScorePlayer | undefined => {
        return players.find(player => player.player.id === playerId);
    };

    advancedStatsEntries.forEach(stat => {
        stat.playerFullName = stat.player?.firstName + " " + stat.player?.lastName;
        stat.playerImageUrl = stat.player?.imageUrl;
        const playerStats = findPlayer(stat.player.id, homePlayers) || findPlayer(stat.player.id, visitorPlayers);

        if (playerStats) {
            stat.min = playerStats.min;
        } else {
            stat.min = "00"; 
        }        

        const propertiesToRound: (keyof AdvancedStatsEntry)[] = [
            'pace', 
            'assistRatio', 
            'assistToTurnover', 
            'defensiveRating', 
            'netRating', 
            'offensiveRating', 
            'turnoverRatio', 
        ];

        propertiesToRound.forEach((property: keyof AdvancedStatsEntry) => {
            if (stat[property] !== undefined) {
                // @ts-ignore
                stat[property] = roundToOneDecimal(stat[property] as number);
            }
        });

        // Convert specific properties to percentages
        stat.effectiveFieldGoalPercentage = convertToPercent(stat.effectiveFieldGoalPercentage);
        stat.trueShootingPercentage = convertToPercent(stat.trueShootingPercentage);
        stat.defensiveReboundPercentage = convertToPercent(stat.defensiveReboundPercentage);
        stat.offensiveReboundPercentage = convertToPercent(stat.offensiveReboundPercentage);
        stat.reboundPercentage = convertToPercent(stat.reboundPercentage);
        stat.assistPercentage = convertToPercent(stat.assistPercentage);
        stat.usagePercentage = convertToPercent(stat.usagePercentage);
        stat.pie = convertToPercent(stat.pie);
    });

    advancedStatsEntries.sort((a, b) => Number(b.min) - Number(a.min));
    advancedStatsEntries = advancedStatsEntries.filter(stat => stat.min !== "0" && stat.min !== "00" && stat.min !== "");
    return advancedStatsEntries;
}

export function completeStats(playerGameStats: BoxScorePlayer[] | LatestPlayerBoxScore[], forLatest: boolean = false) {
    playerGameStats.forEach(stat => {
        stat.playerFullName = stat.player?.firstName + " " + stat.player?.lastName;
        stat.playerImageUrl = stat.player?.imageUrl;

        const propertiesToRound: (keyof BoxScorePlayer)[]
            = ['pts', 'reb', 'blk', 'stl', 'ast', 'fg3m', 'fg3a', 'fga', 'fgm', 'fta', 'ftm', 'turnover'];

        propertiesToRound.forEach((property: keyof BoxScorePlayer) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            stat[property] = roundToOneDecimal(stat[property]);
        });

        if(stat.min[0] === "0") {
            stat.min = stat.min.substring(1);
        }

        stat.fgPct = convertToPercent(stat.fgPct);
        stat.fg3Pct = convertToPercent(stat.fg3Pct);
        stat.ftPct = convertToPercent(stat.ftPct);
    });

    
    if(!forLatest)
        playerGameStats.sort((a, b) => Number(b.min) - Number(a.min));
    
    playerGameStats = playerGameStats.filter(stat => stat.min !== "0" && stat.min !== "00" && stat.min !== "");
    return playerGameStats;
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (prop in p && typeof p[prop] === "number" && p[prop] > maxVal) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            maxVal = p[prop];
                maxIndex = index;
            }
        }
    );
    return maxIndex;
}
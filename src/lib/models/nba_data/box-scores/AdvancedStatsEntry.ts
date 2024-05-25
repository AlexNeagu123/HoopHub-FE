import type { Game } from "../games/Game";
import type { Player } from "../players/Player";
import type { Team } from "../teams/Team";

interface AdvancedStatsEntry {
    id: string;
    player: Player;
    team: Team;
    game: Game;
    pie?: number;
    pace?: number;
    assistPercentage?: number;
    assistRatio?: number;
    assistToTurnover?: number;
    defensiveRating?: number;
    defensiveReboundPercentage?: number;
    effectiveFieldGoalPercentage?: number;
    netRating?: number;
    offensiveRating?: number;
    offensiveReboundPercentage?: number;
    reboundPercentage?: number;
    trueShootingPercentage?: number;
    turnoverRatio?: number;
    usagePercentage?: number;
    playerFullName: string | null;
    playerImageUrl: string | null;
    min: string | null;
}

export type { AdvancedStatsEntry }
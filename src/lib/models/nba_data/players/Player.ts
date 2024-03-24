import type {SeasonAverageStats} from "$lib/models/nba_data/players/SeasonAverageStats";

interface Player {
    id: string;
    apiId: number;
    firstName: string;
    lastName: string;
    position: string;
    height: string;
    weight: number;
    jerseyNumber: number;
    college: string;
    country: string;
    draftYear: number;
    draftRound: number;
    draftNumber: number;
    isActive: boolean;
    imageUrl: string;
    currentTeamId: string;
    seasonAverageStats: SeasonAverageStats[];
}

export type { Player }
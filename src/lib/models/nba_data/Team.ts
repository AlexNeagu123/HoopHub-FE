import type {Player} from "$lib/models/nba_data/Player";

interface Team {
    id: string;
    apiId: number;
    fullName: string;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    imageUrl: string;
    players: Player[];
}

export type { Team };
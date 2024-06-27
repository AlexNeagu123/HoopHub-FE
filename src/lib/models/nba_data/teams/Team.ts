import type { Player } from "$lib/models/nba_data/players/Player";
import type { TeamBio } from "$lib/models/nba_data/teams/TeamBio";

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
    teamBio: TeamBio[];
}

export type { Team };




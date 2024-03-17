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
}

export type { Player }
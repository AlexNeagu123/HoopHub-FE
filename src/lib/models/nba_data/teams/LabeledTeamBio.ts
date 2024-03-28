import type {TeamBio} from "$lib/models/nba_data/teams/TeamBio";

interface LabeledTeamBio {
    teamBio: TeamBio[];
    label: string;
}

export type {
    LabeledTeamBio
}
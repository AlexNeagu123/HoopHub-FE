import type {TeamBio} from "$lib/models/nba_data/teams/TeamBio";

interface TeamBioWithLabel {
    teamBios: TeamBio[],
    label: string
}

export type {TeamBioWithLabel}
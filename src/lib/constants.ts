import {seasonFromIntToStr} from "$lib/utils/standings-utils";

export enum ClaimTypes {
    USERID = 'nameid',
    USERROLE = 'role',
    USERNAME = 'unique_name',
    EXP_TIME = 'exp'
}

export enum WebSockets {
    BOX_SCORE_SOCKET_URL = 'wss://localhost:5001/box-scores-live',
    BOX_SCORES_CHANNEL = 'ReceiveLiveBoxScores'
}

export enum LocalStorageKeys {
    AUTH_TOKEN = 'authToken'
}

export enum AppRoute {
    HOME = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    TEAMS = '/teams',
    TEAM = '/team',
    PLAYER = '/player',
    GAMES = '/games',
    GAME = '/game',
    STANDINGS = '/standings',
    PLAYOFFS = '/playoffs'
}

export enum TeamConstants {
    seasonsGroupSize = 8
}

export enum PlayerConstants {
    seasonGroupSize = 4
}

export enum SeasonConstants {
    currentSeason = 2023,
    minStandingsSeason = 1970
}

export enum TableTypes {
    playerTable = 0,
    teamTable = 1,
    boxScoreType = 2
}

function generateAvailableSeasons() {
    const availableSeasons = [];
    for (let year = SeasonConstants.minStandingsSeason; year <= SeasonConstants.currentSeason; year++) {
        const season = seasonFromIntToStr(year);
        availableSeasons.push(season);
    }
    return availableSeasons.reverse();
}

export enum StandingGroups {
    CONFERENCE = "Conference",
    DIVISION = "Division",
    ALL = "All"
}

export enum PlayoffBorderTypes {
    LEFT = 0,
    RIGHT = 1,
    NONE = 2
}

export const playoffRounds = ["Western Conference First Round", "Western Conference Semifinals", "Western Conference Finals", "Finals",
    "Eastern Conference Finals", "Eastern Conference Semifinals", "Eastern Conference First Round"]

export const standingsAvailableSeasons = generateAvailableSeasons();
export const standingsGroups = ["Conference", "Division", "All"]

export type InformativePopUps = {
    [key: string]: string
}
export const informativePopUps: InformativePopUps = {
    "W-L %": "Win Loss Percentage",
    "ORTG": "An estimate of points produced or scored per 100 possessions",
    "DRTG": "An estimate of points allowed per 100 possessions",
    "PACE": "An estimate of possessions per 48 minutes",
    "SRS": "Team rating that takes into account average point differential and strength of schedule",
    "W": "Wins",
    "L": "Losses",
    "Finish": "Regular season finish (within division)",
    "Rel PACE": "Team's possessions per 48 minutes relative to the league",
    "GP": "Games Played",
    "PPG": "Points Per Game",
    "PTS": "Points Per Game",
    "REB": "Rebounds Per Game",
    "AST": "Assists Per Game",
    "BLK": "Blocks Per Game",
    "STL": "Steals Per Game",
    "FGM": "Field Goals Made",
    "FGA": "Field Goals Attempted",
    "FG%": "Field Goal Percentage",
    "3PM": "Three Point Shots Made",
    "3PA": "Three Point Shots Attempted",
    "3P%": "Three Point Shot Percentage",
    "FTM": "Free Throws Made",
    "FTA": "Free Throws Attempted",
    "FT%": "Free Throw Percentage",
    "TOV": "Turnovers",
    "Eastern": "Record against Eastern Conference",
    "Western": "Record against Western Conference"
}
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
    GAME = '/game'
}

export enum TeamConstants {
    seasonsGroupSize = 8
}

export enum PlayerConstants {
    seasonGroupSize = 4
}

export enum SeasonConstants {
    currentSeason = 2023
}

export enum TableTypes {
    playerTable = 0,
    teamTable = 1,
    boxScoreType = 2
}
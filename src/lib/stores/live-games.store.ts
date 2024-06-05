import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';
import {HttpTransportType, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import type {GameWithBoxScore} from "$lib/models/nba_data/box-scores/GameWithBoxScore";
import type {Response} from "$lib/models/common/Response";
import { WebSockets } from '$lib/constants';

console.log(WebSockets.BOX_SCORE_SOCKET_URL);
export const liveBoxScoreStore: Writable<GameWithBoxScore[]> = writable([]);
const connection = new HubConnectionBuilder().withUrl(WebSockets.BOX_SCORE_SOCKET_URL, {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets
}).configureLogging(LogLevel.Information).build();

connection.on(WebSockets.BOX_SCORES_CHANNEL, (message: Response<GameWithBoxScore[]>) => {
    liveBoxScoreStore.set(message.data);
});

connection.start().then(() => console.log("SignalR connection done successfully.."));
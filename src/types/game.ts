import { GameStatus } from "./gameStatus";
import { Player } from "./player";

export type Game = {
    id: string;
    status: GameStatus;
    players: Player[];
};

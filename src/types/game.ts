import { GameStatus } from "./gameStatus";
import { RoundStatus } from "./roundStatus";
import { Player } from "./player";

export type Game = {
    id: string;
    status: GameStatus;
    round: RoundStatus;
    players: Player[];
};

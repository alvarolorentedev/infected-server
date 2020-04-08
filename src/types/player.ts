import { Card } from "./card";
import { PlayerStatus } from "./playerStatus";

export type Player = {
    name: string;
    card: Card;
    status: PlayerStatus;
};

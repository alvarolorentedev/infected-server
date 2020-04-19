import { RoundStatus } from "./roundStatus";
import { Vote } from "./vote";

export type Round = {
    type: RoundStatus;
    votes: Vote[];
}
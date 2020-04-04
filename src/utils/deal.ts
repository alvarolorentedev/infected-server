import { Card } from '../typeDefs/game';
type cardSpread = {
    infected: number,
    total: number
}
export default function deal(cardSpread: cardSpread): Card {
    if (cardSpread.total === 0)
        return Card[Card[Math.round(Math.random())]]
    
    if((cardSpread.infected/cardSpread.total) < 0.2)
        return Card.Infected

    return Card.Healthy
}
import { Card } from '../typeDefs/game';
type cardSpread = {
    infected: number,
    total: number
}

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }

export default function deal(cardSpread: cardSpread): Card {
    if (cardSpread.total === 0)
        return randomEnum(Card)
    
    if((cardSpread.infected/cardSpread.total) < 0.2)
        return Card.Infected

    return Card.Healthy
}
import deal from '../../src/utils/deal'
import { Card } from '../../src/typeDefs/game'

describe('dealer', () => {
    test.each([
        [0.1, Card.Infected],
        [0.9, Card.Healthy]
      ])('if no card has been dealt and random return $d card should be %d', (fakeRandom, expectEnum) => {
        jest.spyOn(global.Math, 'random').mockReturnValue(fakeRandom)
        expect(deal({infected: 0, total: 0 })).toBe(expectEnum)
        //@ts-ignore
        global.Math.random.mockRestore()
      })

      test.each([
        [1, 1, Card.Healthy],
        [0, 1, Card.Infected],
        [1, 5, Card.Healthy],
        [1, 6, Card.Infected],
        [2, 10, Card.Healthy],
        [2, 11, Card.Infected]
      ])('if %d infected and %d infected should return %d card', (infected, total, expectEnum) => {
        expect(deal({infected, total })).toBe(expectEnum)
      })
      
})
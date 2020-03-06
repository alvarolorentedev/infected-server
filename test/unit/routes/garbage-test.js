const faker =require('faker')

const request = require('./route-initializer')('../../../src/routes/example','/example'),
    example = require('../../../src/routes/example')

describe('example create router should', () => {
    beforeEach(() => {
        example._.table = []
    })

    test('if example has an Id its accepted', async () => {
        let requestBody = {
            _id: faker.random.uuid(),
            other: faker.random.uuid()
        }
        let result = await request.post('/example').send(requestBody)
        expect(result.status).toEqual(200)
        expect(result.text).toEqual(JSON.stringify(requestBody))
        expect(example._.table).toEqual([requestBody])
    })
})

describe('example update router should', () => {
    beforeEach(() => {
        example._.table = []
    })

    test('if toggle is off dont call update', async () => {
        let _id = faker.random.uuid(),
            requestBody = {
                _id,
                other: faker.random.uuid()
            }
        example._.table = [{_id}]
        let result = await request.put(`/example/${_id}`).send(requestBody)
        expect(result.status).toEqual(200)
        expect(result.text).toEqual(JSON.stringify(requestBody))
        expect(example._.table).toEqual([requestBody])
    })
})

describe('example delete router should', () => {
    beforeEach(() => {
        example._.table = []
    })

    test('if toggle is off dont call delete', async () => {
        let _id = faker.random.uuid(),
            requestBody = {
                _id,
                other: faker.random.uuid()
            }
        example._.table = [{_id}]
        let result = await request.delete(`/example/${_id}`).send(requestBody)
        expect(result.status).toEqual(200)
        expect(result.text).toEqual("{}")
        expect(example._.table).toEqual([])
    })
})

describe('example find router should', () => {
    beforeEach(() => {
        example._.table = []
    })

    test('if toggle is off dont call find', async () => {
        let latitude = faker.random.number(100),
            longitude = faker.random.number(100),
            radius = faker.random.number(100),
            _id = faker.random.uuid()

        example._.table = [{_id}]
        let result = await request.get(`/example/?latitude=${latitude}&longitude=${longitude}&radius=${radius}`)
        expect(result.status).toEqual(200)
        expect(result.text).toEqual(JSON.stringify([{_id}]))
        expect(example._.table).toEqual([{_id}])
    })
})

const router = require('express').Router()
let _ ={
    table: []
}

router.post('/', async (req, res) => {
    _.table.push(req.body)
    res.send(req.body)
})

router.put('/:_id', async (req, res) => {
    _.table = _.table.filter(element => element._id != req.params._id)
    _.table.push(req.body)
    res.send(req.body)
})

router.delete('/:_id', async (req, res) => {
    _.table = _.table.filter(element => element.id != req.params.id)
    res.send({}) 
})

router.get('/', async (req, res) => {
    let result = _.table
    res.send(result)
})

module.exports = router
module.exports._ = _
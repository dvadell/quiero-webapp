var express = require('express')
var router = express.Router()
var Quiero = require('../model/quieros')


router.get('/:title', (req, res, next) => {
    Quiero.getQuieroByTitle( req.params.title, (err, result) => {
        if (err) { res.send(err) }
        if (result.length < 1) { res.send('NUEVO')}
        // console.log('Router:', result)
        res.send(result) 
    })
}) 

router.post('/:title', (req, res, next) => {
    Quiero.getQuieroByTitle( req.params.title, (err, result) => {
        if (err) { res.send(err) }
        currData = { description: '', pros: '', cons: '', title: ''}
        if (result.length === 1) { currData = result[0] }
        updatedData = { ...currData, ...req.body }

        Quiero.setQuiero( updatedData, (err, result) => {
            if (err) { res.send(err) }
            console.log('API:', result)
            res.send({result: 'ok'}) 
        })
    })
}) 
module.exports = router;

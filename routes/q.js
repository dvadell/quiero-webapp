var express = require('express')
var router = express.Router()
var Quiero = require('../model/quieros')


router.get('/:title', (req, res, next) => {
    Quiero.getQuieroByTitle( req.params.title, (err, result) => {
        if (err) { res.send(err) }
        if (result.length < 1) { 
            res.redirect(req.params.title + '/edit')
        } else {
            res.render('show_q', result[0]) 
        }
    })
}) 

router.get('/:title/edit', (req, res, next) => {
    Quiero.getQuieroByTitle( req.params.title, (err, result) => {
        if (err) { res.send(err) }
        if (result.length < 1) { result[0] = { title: req.params.title, description: '', pros: '', cons: ''}}
        res.render('edit_q', result[0]) 
    })
}) 

router.post('/:title', (req, res, next) => {
    quiero = {...req.body, title: req.params.title}
    console.log('Controller: ', quiero)
    Quiero.setQuiero( quiero, (err, result) => {
        if (err) { res.send(err) }
    })
    res.redirect(req.params.title)
    console.log('Terminé')
})

module.exports = router;

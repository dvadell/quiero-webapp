var mongoose = require('mongoose')
var QuieroSchema = mongoose.Schema({
   title: { type: String },
   description: {  type: String },
   pros: { type: String },
   cons: { type: String }
})

var Quiero = module.exports = mongoose.model('Quiero', QuieroSchema)
module.exports.getQuieros = (callback, limit) => {
    Quiero.find(callback).limit(limit)
}

module.exports.getQuieroByTitle = (title, callback) => {
    Quiero.find({title: title}, callback)
}

module.exports.setQuiero = (quiero , callback) => {
    Quiero.updateOne({
        title:       quiero.title,
        description: quiero.description,
        pros:        quiero.pros,
        cons:        quiero.cons
    }, callback)
}
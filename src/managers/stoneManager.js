const Stone = require('../models/Stone')
const User = require("../models/User")

exports.create = (userId, stoneData) => {
    const createdStone = Stone.create({
        owner: userId,
        ...stoneData
    })
    return createdStone
}

exports.getAll = () => Stone.find()
exports.getOne = (stoneId) => Stone.findById(stoneId)
exports.getOneWithDetails = (stoneId) => this.getOne(stoneId).populate('owner').populate("likedList")
exports.getThree = () => Stone.find().sort({_id: -1}).limit(3)


exports.like = async(stoneId, userId) => {
    await Stone.findByIdAndUpdate(stoneId, {$push: {likedList: userId}})
}


exports.edit = (stoneId, stoneData) => Stone.findByIdAndUpdate(stoneId, stoneData, { runValidators: true })
// exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId)
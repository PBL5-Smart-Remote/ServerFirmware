const mongoose = require('mongoose');

module.exports = {
    multipleMongooseToObject: function (mongoosesArray) {
        return mongoosesArray.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
    generateObjectID: function () {
        return new mongoose.Types.ObjectId();
    }
};
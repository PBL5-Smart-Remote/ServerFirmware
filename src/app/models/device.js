const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Device = new Schema({
    name: { type: String, required: false, default: "(unnamed)" },
    pin: { type: String, required: true },
    type: { type: String, required: false, default: "(untype)" }, // FAN, DOOR, LIGHT
    isConnected: { type: Boolean, default: true },
    status: { type: Number, default: 0 }, // -1: notConnected, 0: OFF, 1: ON
    ESP: { type: mongoose.Schema.Types.ObjectId, ref: "esp" },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "room" }
}, {
    timestamps: true,
    statics: {
        async addDevice(_idDevice, pin) {
            var device = await this({
                _id: _idDevice,
                pin: pin
            });

            await device.save();
        },

        async changeStatus(_idDevice, status) {
            var status = (String('on').valueOf() == new String(status).toLowerCase().valueOf()) ? 1 : 0;

            await this.updateOne({
                _id: _idDevice
            }, {
                $set: {
                    status: status
                }
            }).catch(err => {
                throw err
            });
        },

        async getDevice(_idDevice) {
            return await this.findById(_idDevice)
                .populate({ path: 'ESP' })
                .populate({ path: 'room' })
        },

        async updateDevice(_idDevice, update) {
            const device = await this.getDevice(_idDevice);

            if (!device) {
                throw Error('Not found any device with this _id');
            }

            return await this.findByIdAndUpdate(_idDevice, update);
        }
    }
});

module.exports = mongoose.model('device', Device);
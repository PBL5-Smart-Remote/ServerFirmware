const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Label = new Schema({
    label: { type: String }
}, {
    timestamps: true,
    statics: {
        async decodeLabel(label) {
            var data = {
                status: undefined,
                label: undefined
            }

            // data.status = label[0] == 1 ? await this.findOne({ label: 'Bật' }) : await this.findOne({ label: 'Tắt' })
            // console.log(data.status)
            data.status = label[0]
            var search = String();

            if (label[1] == 0) {
                if (label[2] == 0) {
                    search = 'Cửa'
                } else {
                    search = 'Đèn ' + label[2]
                }
            } else {
                search = 'Đèn ' + label[1]
            }

            data.label = await this.findOne({ label: search })
            // console.log(data.label)
            return data
        }
    },
});

module.exports = mongoose.model('label', Label);
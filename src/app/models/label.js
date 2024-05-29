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

            data.status = label[0]
            var search = String();

            if (label[1] == 0) {
                if (label[2] == 0) {
                    search = 'Cửa'
                } else {
                    search = 'Quạt ' + label[2]
                }
            } else {
                search = 'Đèn ' + label[1]
            }

            data.label = await this.findOne({ label: search })
            // console.log(data.label)
            return data
        },

        async getLabels(type) {
            var labels = await this.find({ type: type });
            return labels
        }
    },
});

module.exports = mongoose.model('label', Label);
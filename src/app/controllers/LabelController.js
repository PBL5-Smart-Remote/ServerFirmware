const Label = require('../models/label');

class LabelController {
    // [GET] labels/:type
    async getLabels(req, res, next) {
        try {
            var labels = await Label.getLabels(req.params.type)

            console.log(labels)
            res.status(200).json({
                labels
            });
        } catch (err) {
            res.status(400).json({ "Error: ": err });
        }
    }
}

module.exports = new LabelController;
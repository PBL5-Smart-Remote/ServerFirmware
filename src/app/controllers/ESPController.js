const ESP = require('../models/ESP');
const { createNewESP } = require('../../util/esp');

// esps/
class ESPController {
    // [GET] connect/:idESP?numPort
    async connect(req, res, next) {
        const esp = await ESP.getInfo(req.params._idESP);

        if (esp) {
            res.status(200).json(esp);
        } else {
            var newESP = await createNewESP(req.params._idESP, req.query.numDevices);
            ESP.addESP(newESP);
            res.status(200).json(newESP);
        }
    }

    // [GET] /:idESP
    async getInfo(req, res, next) {
        ESP.getInfo(req.params._idESP)
            .then((esp) => {
                if (esp) {
                    console.log('existed in db');
                    return Promise.resolve(esp);
                } else {
                    throw new Error(`Not found esp with _idESP = ${req.params._idESP}`)
                }
            })
            .then((esp) => {
                res.status(200).json(esp);
            })
            .catch(err => {
                res.status(404).json({
                    'text': err.message.toString()
                });
            });
    }
}

module.exports = new ESPController;
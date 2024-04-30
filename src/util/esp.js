const { generateObjectID } = require('./mongoose');
const Device = require('../app/models/device')
module.exports = {
    createNewESP: async function (_idESP, numDevices) {
        const newESP = {
            _id: generateObjectID().toString(),
            _idESP: _idESP,
            numDevices: parseInt(numDevices),
        };

        const devices = [];
        const pinESP = ['D1', 'D2', 'D5', 'D6']

        for (let index = 0; index < parseInt(numDevices); index++) {
            const idGenerated = generateObjectID();
            const pin = {
                _id: idGenerated,
                pin: pinESP[index]
            }

            await Device.addDevice(idGenerated, pinESP[index]);

            devices.push(pin);

            newESP.devices = devices;

        }
        return newESP;
    }
}
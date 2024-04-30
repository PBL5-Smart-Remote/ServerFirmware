const Device = require('../models/device');

// devices/
class DeviceController {
    async changeStatus(req, res, next) {
        try {
            const devicesInfos = req.body.devices;
            console.log(devicesInfos);

            devicesInfos.forEach(async (info) => {
                await Device.changeStatus(info._id, info.status);
            });

            res.status(200).json("Succesful updated");
        } catch (err) {
            res.status(400).json("Failure updated");
        }
    }
}

module.exports = new DeviceController;
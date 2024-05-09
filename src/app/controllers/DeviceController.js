const Device = require('../models/device');
const Label = require('../models/label');
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

    async getDevice(req, res, next) {
        try {
            console.log(req.params.idDevice);
            if (req.params.idDevice == 'allDevices') {
                const devices = await Device.getAllDevices();
                res.status(200).json(devices);
            } else {

                const device = await Device.getDevice(req.params.idDevice);
                res.status(200).json(device);
            }

            // devicesInfos.forEach(async (info) => {
            //     await Device.changeStatus(info._id, info.status);
            // });


        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    }

    async updateDevice(req, res, next) {
        try {
            console.log(req.params.idDevice);
            const device = await Device.updateDevice(req.params.idDevice, req.body);

            res.status(200).json("Updated");
        } catch (err) {
            console.log(err)
            res.status(400).json(err.message);
        }
    }


    async updateByAudio(req, res, next) {
        try {
            console.log(req.body);

            const decodedLabel = await Label.decodeLabel(req.body.label);
            console.log(decodedLabel);

            await Device.changeStatusByDecode(req.body.idRoom, decodedLabel);

            res.status(200).json("Updated");

        } catch (err) {
            console.log(err)
            res.status(400).json(err.message);
        }
    }
}

module.exports = new DeviceController;
const cron = require('node-cron');
const axios = require('axios');
// Schedule a job to run every minute
const Device = require('../app/models/device')
module.exports = {
    cron_schedule: function cron_schedule(path) {
        cron.schedule('* * * * *', () => {
            // Make a GET request to the local server endpoint
            axios.get(path)
                .then(response => {
                    // Log the response data
                    console.log(response.data.devicesStatus);
                    const devicesStatus = response.data.devicesStatus;
                    devicesStatus.forEach(deviceStatus => {
                        console.log(deviceStatus._id, deviceStatus.status)
                        Device.changeStatus(deviceStatus._id, deviceStatus.status)
                    });
                })
                .catch(error => {
                    // Log any errors
                    console.error('Error calling API:', error);
                });
        });

        console.log('Cron job scheduled to run every minute.');
    }
};
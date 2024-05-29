const espRouter = require('./ESP');
const deviceRouter = require('./device')
const labelsRouter = require('./labels')

function route(app) {
    /*

    Paramerters
        app: express Instance
    */
    //app.use('/object_1', object_1Router);
    app.use('/labels', labelsRouter);
    app.use('/esps', espRouter);

    app.use('/devices', deviceRouter)

}

module.exports = route;
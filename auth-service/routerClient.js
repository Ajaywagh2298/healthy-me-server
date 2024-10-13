const logsService = require('../utils/logsUtils')
const useRoute = require('../routes/userRoute');


const routerService = ( app ) => {

    // Inital Service Start Route
    app.get('/', (req, res) => {
        res.status(200).send('Hey this is my API running 🥳');
      });

    // Route list
    app.use('/api', useRoute)


    // Route Error Handling
    app.use((err, req, res, next) => {
        logsService.apiErrorLogsSendTelegram('error', 500, serverError)
        res.status(500).json({
            serverError
        });
      });


    return app;
}

const serverError = {
    message: "500: INTERNAL_SERVER_ERROR",
    code: "FUNCTION_INVOCATION_FAILED",
    id: "bom1::6d4v8-1725912118020-2f3bc51fbb3a",
    suggestion: "If you are a visitor, contact the website owner or try again later. If you are the owner, learn how to fix the error and check the logs."
}

module.exports = {routerService};
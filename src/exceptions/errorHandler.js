function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err)
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    res.status(500).json({ "message": err.message });
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
}
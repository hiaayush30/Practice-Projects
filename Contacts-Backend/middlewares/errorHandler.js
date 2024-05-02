const errorHandler = function (err, req, res, next) {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
    case 400: res.json({
        title: "Validation failed",
        msg: err.message,
        stackTrace: err.stack
    })
    case 401: res.json({
        title: "Unauthorized",
        msg: err.message,
        stackTrace: err.stack
    })
    case 403: res.json({
        title: "Forbidden",
        msg: err.message,
        stackTrace: err.stack
    })
    case 404: res.json({
        title: "Not found",
        msg: err.message,
        stackTrace: err.stack
    })
    case 500: res.json({
        title: "Server Error",
        msg: err.message,
        stackTrace: err.stack
    })
    default:
        console.log("No errors!");
    }
}

module.exports = {
    errorHandler
}

const sendResponse = function (res, status, data, message, statusCode = 200, apiVersion = null) {
    let obj = {
        status,
        data,
        message,
        apiVersion: apiVersion || 'No Version'
    };

    return res.status(statusCode).json(obj);
};

export default sendResponse;

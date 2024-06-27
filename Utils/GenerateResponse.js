const generateResponse = (statusCode, message, data) => {
    return {
        statusCode: statusCode,
        message: message,
        data: data
    }
}

module.exports = {
    generateResponse
}
exports.jsonSuccess = (resObj, msg, details=null) => {
    responce = {
        status: true,
        message: msg,
        details: details
    }
    resObj.send(responce)
}


exports.jsonError = (resObj, msg, details=null) => {
    responce = {
        status: false,
        message: msg,
        details: details
    }
    resObj.send(responce)
}

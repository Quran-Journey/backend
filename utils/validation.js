// This is a constant response return format so that all of our responses have the same format.
function setResult(d, pass, msg, code) {
    console.log(msg);
    return { data: d, success: pass, error: msg, ecode: code };
}

/** Simply prepare an response for invalid inputs */
function returnInvalid(msg) {
    return setResult({}, false, msg, utils.Errors.DB_INVALID);
}

/**
 * Check to see if the values of a request body are empty.
 * This is a helper function for checkBody
 */
function checkEmptyBody(data) {
    var keys = Object.keys(data);
    if (keys.length == 0) {
        return setResult(
            {},
            false,
            "Request data is empty.",
            Errors.DB_INVALID
        );
    }
    for (var i = 0; i < keys.length; i++) {
        if (!keys[i]) {
            return setResult(
                data,
                false,
                "data is missing atleast one key, value pair.",
                Errors.DB_INVALID
            );
        }
    }
    return;
}

// Regex for the different data types that can be stored
const dataTypeRegex = {
    time: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    date: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
    datetime:
        /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01]) (?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]+$/,
    phone: /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?||.?))(\d{3}(\s|-?|.?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/,
    string: /.*/,
    bool: /([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])/, //I made this one myself, tested it as well.
    integer: /\d+/, //I made this one myself, not tested.
    list: "ignore",
};

/**
 * This function uses regular expressions to check if the body's values are of the correct type.
 *
 * @param {Object[key, type]} required
 */
function checkBodyTypes(data, required) {
    var keys = Object.keys(required);
    for (var i = 0; i < Object.keys(required).length; i++) {
        var key = keys[i];
        var type = required[key];
        var value = data[key];
        if (value == undefined) {
            return setResult(
                data,
                false,
                "Undefined value set for: " + key,
                Errors.DB_INVALID
            );
        }
        if (
            dataTypeRegex[type] &&
            dataTypeRegex[type] != "ignore" &&
            !dataTypeRegex[type].test(value)
        ) {
            // If the regex test fails, this implies that the formatting is incorrect.
            return setResult(
                data,
                false,
                "Invalid value set for: " + key,
                Errors.DB_INVALID
            );
        }
    }
    return;
}

/**
 * This function uses checks to see if the body's keys are named correctly.
 *
 * @param {Object[key, type]} required
 * @param {bool} print
 */

function checkBodyKeys(data, required, p = true) {
    var keys = Object.keys(data);
    var requiredKeys = Object.keys(required);
    for (var i = 0; i < Object.keys(requiredKeys).length; i++) {
        if (!keys[i] || !keys.includes(requiredKeys[i])) {
            if (p) {
                console.log(
                    "Invalid: data is missing the key: " + requiredKeys[i]
                );
            }
            return setResult(
                data,
                false,
                "data is missing the key: " + requiredKeys[i],
                Errors.DB_INVALID
            );
        }
    }
    return;
}

/**
 * This function does some simple validation of the formats.
 * It uses helper functions to ensure that the data is not missing any parameters,
 * that the data includes the required keys.
 *
 * @param {Object} data
 * The request body
 * @param {List[String]} params
 * The keys that should be in the body
 * @param {List[String]} types
 * The types of the values that should be in the parameters
 */
function simpleValidation(data, required, p = true) {
    var empty = checkEmptyBody(data);
    if (empty) {
        return empty;
    }
    var empty = checkBodyKeys(data, required, p);
    if (empty) {
        return empty;
    }
    var empty = checkBodyTypes(data, required);
    if (empty) {
        return empty;
    }
    return;
}

module.exports = {
    returnInvalid: returnInvalid,
    setResult: setResult,
    simpleValidation: simpleValidation,
};
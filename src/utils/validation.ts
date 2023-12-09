import { Result, Errors } from "./constants";

interface DataTypeRegex {
    time: RegExp;
    date: RegExp;
    datetime: RegExp;
    email: RegExp;
    phone: RegExp;
    string: RegExp;
    bool: RegExp;
    integer: RegExp;
    list: "ignore";
}

// Regex for the different data types that can be stored
const dataTypeRegex: DataTypeRegex = {
    time: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    date: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
    datetime: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01]) (?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]+$/,
    phone: /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?||.?))(\d{3}(\s|-?|.?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/,
    string: /.*/,
    bool: /([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])/, //I made this one myself, tested it as well.
    integer: /\d+/, //I made this one myself, not tested.
    list: "ignore",
};

/**
 * Check to see if the values of a request body are empty.
 * This is a helper function for checkBody
 */
function checkEmptyBody(data: any): Result | undefined {
    const keys = Object.keys(data);

    if (keys.length === 0) {
        return new Result({
            data: {},
            success: false,
            msg: "Request data is empty.",
            code: Errors.INVALID_REQUEST,
        });
    }

    for (let i = 0; i < keys.length; i++) {
        if (!keys[i]) {
            return new Result({
                data: data,
                success: false,
                msg: "data is missing at least one key, value pair.",
                code: Errors.INVALID_REQUEST,
            });
        }
    }

    return;
}

/**
 * This function uses regular expressions to check if the body's values are of the correct type.
 *
 * @param {Object[key, type]} required
 */
function checkBodyTypes(data: any, required: Record<string, string>): Result | undefined {
    const keys = Object.keys(required);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const type = required[key] as keyof DataTypeRegex;
        const value = data[key];

        if (value === undefined) {
            return new Result({
                data: data,
                success: false,
                msg: `Undefined value set for: ${key}`,
                code: Errors.INVALID_REQUEST,
            });
        }
        // @ts-ignore
        if (dataTypeRegex[type] && dataTypeRegex[type] !== "ignore"&& !dataTypeRegex[type].test(value)) {
            // If the regex test fails, this implies that the formatting is incorrect.
            return new Result({
                data: data,
                success: false,
                msg: `Invalid value set for: ${key}`,
                code: Errors.INVALID_REQUEST,
            });
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
function checkBodyKeys(data: any, required: Record<string, string>, p = true): Result | undefined {
    const keys = Object.keys(data);
    const requiredKeys = Object.keys(required);

    for (let i = 0; i < requiredKeys.length; i++) {
        if (!keys[i] || !keys.includes(requiredKeys[i])) {
            if (p) {
                console.log("Invalid: data is missing the key: " + requiredKeys[i]);
            }

            return new Result({
                data: data,
                success: false,
                msg: `data is missing the key: ${requiredKeys[i]}`,
                code: Errors.DB_INVALID,
            });
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
function validate(data: any, required: Record<string, string>, p = true): Result | undefined {
    let empty = checkEmptyBody(data);

    if (empty) {
        return empty;
    }

    empty = checkBodyKeys(data, required, p);

    if (empty) {
        return empty;
    }

    empty = checkBodyTypes(data, required);

    if (empty) {
        return empty;
    }

    return;
}

export default validate;

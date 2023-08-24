const db = require("./connect");
const {Errors, Messages} = require("../../utils/constants")

const defaultMsg = new Messages({});

/** A function that gets us a string representation of an operator based on a string
 *
 * @param {string} operator
 * The string representation of the operator
 */
function getOperator(operator) {
    switch (operator) {
        case "eq":
            return "=";
        case "gt":
            return ">";
        case "lt":
            return "<";
        case "gte":
            return ">=";
        case "lte":
            return "<=";
        default:
            return false;
    }
}

/** A function that will return the pagination portion of an sql SELECT statement.
 *
 * @param {string} data
 * The query data coming from the request
 */
function paginate(data) {
    // Here, we just need make sure that the page and results per page are valid inputs
    var invalid = simpleValidation(data, {
        page: "integer",
        results_per_page: "integer",
    });
    if (invalid) {
        return "";
    }
    if (isNaN(page) || isNaN(results_per_page)) {
        return returnInvalid(
            `Invalid value for pagination. Either "page" or "results_per_page" is not a number.`
        );
    }
    return `LIMIT ${results_per_page} OFFSET ${page * results_per_page};s`;
}

/**
----------------------------------------------------------------------------------
THE FOLLOWING FUNCTIONS IMPLEMENT THE DIFFERENT VARIATIONS OF THE CRUD OPERATIONS.
----------------------------------------------------------------------------------
*/

/**
 * This function prepares a generic row fetch based on the inputs.
 * This function can fetch none, one, or more rows based on an sql command and passed in parameters.
 * It also takes ina message object which contains three
 *
 * @param {String} sql
 * The query to be executed
 * @param {List[String]} params
 * The values that will be passed into the query
 * @param {Message} message
 * Any success or error messages that the client may receive
 */
async function retrieve(sql, params = [], message = defaultMsg) {
    console.log(
        "-- The following query is being executed --\n sql: " +
            sql +
            "\n params: " +
            params
    );
    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                return setResult([], false, message.notFound, Errors.DB_DNE);
            }
            return setResult(
                result.rows,
                true,
                message.fetched,
                Errors.DB_NONE
            );
        })
        .catch((e) => {
            console.log("\nERROR!\n", e);
            return setResult([], false, message.server, Errors.DB_SERVER);
        });
}

/**
 * This function prepares a generic row update based on the inputs.
 * This function can update none, one, or more rows based on an sql command and passed in parameters.
 *
 * @param {String} sql
 * @param {List[String]} params
 * @param {Message} message
 */
async function update(sql, params = [], message = defaultMsg) {
    // Note: Should all update calls must return all columns (i.e. RETURNING *)?
    console.log(
        "-- The following query is being executed --\n sql: " +
            sql +
            "\n params: " +
            params
    );
    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                return setResult({}, false, message.notFound, Errors.DB_DNE);
            }
            return setResult(
                result.rows,
                true,
                message.fetched,
                Errors.DB_NONE
            );
        })
        .catch((e) => {
            console.log("\nUpdate error!\n", e);
            return setResult({}, false, message.server, Errors.DB_SERVER);
        });
}

/**
 * This function acts as a generic insert into the database.
 *
 * @param {String} sql
 * @param {List[String]} params
 * @param {Message} message
 */
async function create(sql, params = [], message = defaultMsg) {
    // Note: Should all update calls must return all columns (i.e. RETURNING *)?
    console.log(
        "-- The following query is being executed --\n sql: " +
            sql +
            "\n params: " +
            params
    );
    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                // Items were not inserted, but an error was not raised. Be confused.
                console.log("\n!Nothing was inserted!\n");
                return setResult({}, false, message.notFound, Errors.DB_DNE);
            }
            // Succesfully inserted items.
            console.log("\nSuccess!\n");
            return setResult(
                result.rows,
                true,
                message.fetched,
                Errors.DB_NONE
            );
        })
        .catch((e) => {
            if (e.code == "23505") {
                // This implies we are inserting something that violates a unique key constraint
                console.log("\n!Creation Failure: Duplicate!\n");
                return setResult(
                    {},
                    false,
                    message.duplicate,
                    Errors.DB_UNIQUE
                );
            }
            if (e.code == "42601") {
                // This implies we are inserting something that violates a unique key constraint
                console.log(
                    "\n!Creation Failure: Improper number of parameters passed in!\n"
                );
                return setResult(
                    {},
                    false,
                    "Improper number of parameters passed in.",
                    Errors.DB_INVALID
                );
            }
            if (e.code == "23503") {
                // This implies we are inserting something that violates a unique key constraint
                console.log("\n!Creation Failure: Foreign Key Constraints!\n");
                return setResult({}, false, message.foreign, Errors.DB_FOREIGN);
            }
            // There was an uncaught error due to our query.
            console.log("\n!Creation error!\n", message.server, e);
            return setResult({}, false, message.server, Errors.DB_SERVER);
        });
}

/**
 * NOTE: this implements the based delete operation, but we cannot call it delete in js
 * This function prepares a generic row deletion based on the inputs.
 * This function can delete none, one, or more rows based on an sql command and passed in parameters.
 *
 * @param {String} sql
 * @param {List[String]} params
 * @param {Message} message
 */
async function remove(sql, params = [], message = defaultMsg) {
    // Note: Should all update calls must return all columns (i.e. RETURNING *)?
    console.log(
        "-- The following query is being executed --\n sql: " +
            sql +
            "\n params: " +
            params
    );
    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                return setResult({}, false, message.notFound, Errors.DB_DNE);
            }
            return setResult(
                result.rows,
                true,
                message.fetched,
                Errors.DB_NONE
            );
        })
        .catch((e) => {
            console.log("\n!Deletion error!\n", message.server, e);
            return setResult({}, false, message.server, Errors.DB_SERVER);
        });
}

module.exports = {
    retrieve: retrieve,
    update: update,
    create: create,
    remove: remove,
    getOperator: getOperator,
    paginate: paginate,
};

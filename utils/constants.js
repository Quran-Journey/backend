/**
 * This file holds project-wide constants
 */


/**
 * Error Codes. i.e. Enums associated with Errors.
 */
const Errors = {
    NONE: 0, // No errors
    INVALID_REQUEST: 1, // Invalid parameters
    DB_UNIQUE: 2, // Cannot insert a duplicate value, unique constraint.
    DB_SERVER: 3, // Error in the postgres server
    DB_DNE: 4, // The queried items do not exist in the db
    DB_INVALID: 5, // Invalid values passed into contents
    DB_FOREIGN: 6, // Foreign key constraint
    AUTH_UNAUTHORIZED: 7, // Unauthorized access
    AUTH_INVALID: 8, // Invalid Credentials
};

/**
 * This class represents messages that will be returned to the user.
 */
class Messages {
    constructor(options) {
        this.default = options.default || "";
        this.invalidParams = options.default || "Improper number of parameters passed in.";
        this.success = options.success || "Successful.";
        this.dbNotFound = options.dbNotFound || "No rows found.";
        this.dbServer = options.dbServer || "An error occured in the postgres server.";
        this.dbDuplicate = options.dbDuplicate || "Duplicate item in postgres database.";
        this.dbForeign = options.dbForeign || "Violating foreign key constraint.";
        this.authAuthorized = options.authAuthorized || "User is authorized.";
        this.authAuthenticated = options.authAuthenticated || "Authentication Successful.";
        this.authUnauthorized = options.authUnauthorized || "Not authorized.";
    }
}

module.exports = {
    Errors,
    Messages
};

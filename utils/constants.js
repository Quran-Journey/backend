/**
 * This file holds project-wide constants
 */


/**
 * Error Codes. i.e. Enums associated with Errors.
 */
const Errors = {
    NONE: 0, // No errors
    DB_UNIQUE: 1, //
    DB_SERVER: 2, //
    DB_DNE: 3, // The queried items do not exist in the db
    DB_INVALID: 4, // Invalid values passed into contents
    DB_FOREIGN: 5, // Foreign key constraint
    AUTH_UNAUTHORIZED: 6, // Unauthorized access
    AUTH_INVALID: 7, // Invalid Credentials
};

/**
 * This class represents messages that will be returned to the user.
 */
class Messages {
    constructor(options) {
        this.dbSuccess = options.dbSuccess || "Successfully fetched rows.";
        this.dbNotFound = options.dbNotFound || "No rows found.";
        this.dbServer = options.dbServer || "An error occured in the PSQL server.";
        this.dbDuplicate = options.dbDuplicate || "Duplicate item in db.";
        this.dbForeign = options.dbForeign || "Violating foreign key constraint.";
        this.authAuthorized = options.authAuthorized || "User is authorized.";
        this.authAuthenticated = options.authAuthenticated || "Authentication Successful.";
        this.authUnauthorized = options.authUnauthorized || "Not authorized.";
    }
}

module.exports = {
    Messages,
    Errors
};

/**
 * Error Codes. i.e. Enums associated with Errors.
 */
export enum Errors {
    NONE = 0, // No errors
    INVALID_REQUEST = 1, // Invalid parameters
    DB_UNIQUE = 2, // Cannot insert a duplicate value, unique constraint.
    DB_SERVER = 3, // Error in the PostgreSQL server
    DB_DNE = 4, // The queried items do not exist in the database
    DB_INVALID = 5, // Invalid values passed into contents
    DB_FOREIGN = 6, // Foreign key constraint
    AUTH_UNAUTHORIZED = 7, // Unauthorized access
    AUTH_INVALID = 8, // Invalid Credentials
}

/**
 * This class represents messages that will be returned to the user.
 */
export class Messages {
    default: string;
    invalidParams: string;
    success: string;
    dbNotFound: string;
    dbServer: string;
    dbDuplicate: string;
    dbForeign: string;
    authAuthorized: string;
    authAuthenticated: string;
    authUnauthorized: string;

    constructor(options: any) {
        this.default = options.default || "";
        this.invalidParams = options.invalidParams || "Improper number of parameters passed in.";
        this.success = options.success || "Successful.";
        this.dbNotFound = options.dbNotFound || "No rows found.";
        this.dbServer = options.dbServer || "An error occurred in the PostgreSQL server.";
        this.dbDuplicate = options.dbDuplicate || "Duplicate item in the PostgreSQL database.";
        this.dbForeign = options.dbForeign || "Violating foreign key constraint.";
        this.authAuthorized = options.authAuthorized || "User is authorized.";
        this.authAuthenticated = options.authAuthenticated || "Authentication Successful.";
        this.authUnauthorized = options.authUnauthorized || "Not authorized.";
    }
}

export class Result {
    data: any;
    success: boolean;
    msg: string;
    code: Errors;

    /**
     * This is a constant response return format so that all of our responses have the same format.
     *
     * @param {Object} d The data that is to be returned to the user
     * @param {boolean} pass Whether or not the request passed successfully
     * @param {string} msg The message associated with a result
     * @param {integer} code The error code associated with a result.
     */
    constructor(options: any) {
        this.data = options.data || {};
        this.success = options.success || false;
        this.msg = options.msg || new Messages({}).default;
        this.code = options.code || Errors.NONE;
        console.log(this.msg);
    }
}

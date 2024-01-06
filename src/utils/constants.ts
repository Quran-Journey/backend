import _ from "lodash";

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
        this.default = options.default || "No details.";
        this.invalidParams =
            options.invalidParams || "Improper number of parameters passed in.";
        this.success = options.success || "Successful.";
        this.dbNotFound = options.dbNotFound || "No rows found.";
        this.dbServer =
            options.dbServer || "An error occurred in the PostgreSQL server.";
        this.dbDuplicate =
            options.dbDuplicate || "Duplicate item in the PostgreSQL database.";
        this.dbForeign =
            options.dbForeign || "Violating foreign key constraint.";
        this.authAuthorized = options.authAuthorized || "User is authorized.";
        this.authAuthenticated =
            options.authAuthenticated || "Authentication Successful.";
        this.authUnauthorized = options.authUnauthorized || "Not authorized.";
    }
}

export type ResultData<T> = {
    data: T[];
    success: boolean;
    msg: string | string[];
    code: Errors;
};

export class Result<T> {
    data: T[];
    success: boolean;
    msg: string | string[];
    code: Errors;

    constructor(options: ResultData<T>, log = true) {
        this.data = options.data;
        if (Array.isArray(this.data)) {
            this.data = this.data.map((item: any) => this.convertKeysToCamelCase(item))
        }
        this.success = options.success;
        if (typeof options.msg == "string") {
            this.msg = [options.msg];
        } else {
            this.msg = options.msg;
        }
        this.code = options.code;
        if (log) {
            console.log(this.msg);
        }
    }

    private convertKeysToCamelCase(obj: any): T {
        const camelCaseData = _.mapKeys(obj, (value, key) =>
            _.camelCase(key)
        );
        return camelCaseData as T;
    }

    // Static method to create a default result
    static createDefault<T>(
        success = false,
        msg = new Messages({}).default,
        log = false
    ): Result<T> {
        return new Result<T>(
            {
                data: [],
                success: success,
                msg: msg,
                code: Errors.NONE,
            },
            log
        );
    }
}

import  connect  from "./connect";
import { Errors, Messages, Result } from "../../utils/constants";
import validate from "../../utils/validation";

const defaultMsg = new Messages({});
const db = connect.db;
/** A function that gets us a string representation of an operator based on a string
 *
 * @param {string} operator
 * The string representation of the operator
 */
function getOperator(operator: string): string | false {
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

/** A function that will return the pagination portion of an SQL SELECT statement.
 *
 * @param {Object} data
 * The query data coming from the request
 */
function paginate(data: { page: number; results_per_page: number }): string | Result {
  const { page, results_per_page } = data;

  // Here, we just need to make sure that the page and results per page are valid inputs
  const invalid = validate(data, {
    page: "integer",
    results_per_page: "integer",
  });

  if (invalid) {
    return "";
  }

  if (isNaN(page) || isNaN(results_per_page)) {
    return new Result({
      data: [],
      success: false,
      msg: `Invalid value for pagination. Either "page" or "results_per_page" is not a number.`,
      code: Errors.INVALID_REQUEST,
    });
  }

  return `LIMIT ${results_per_page} OFFSET ${page * results_per_page}`;
}

/**
 * ----------------------------------------------------------------------------------
 * THE FOLLOWING FUNCTIONS IMPLEMENT THE DIFFERENT VARIATIONS OF THE CRUD OPERATIONS.
 * ----------------------------------------------------------------------------------
 */

/**
 * This function prepares a generic row fetch based on the inputs.
 * This function can fetch none, one, or more rows based on an SQL command and passed-in parameters.
 * It also takes in a message object that contains three
 *
 * @param {string} sql
 * The query to be executed
 * @param {Array<string | number>} params
 * The values that will be passed into the query
 * @param {Message} message
 * Any success or error messages that the client may receive
 */
async function retrieve(
  sql: string,
  params: Array<string | number> = [],
  message: Messages = defaultMsg
): Promise<Result> {
  console.log(
    "-- The following query is being executed --\n sql: " +
      sql +
      "\n params: " +
      params
  );

  try {
    const result = await db.query(sql, params);

    if (result.rows[0] == null) {
      return new Result({
        data: [],
        success: false,
        msg: message.dbNotFound,
        code: Errors.DB_DNE,
      });
    }

    return new Result({
      data: result.rows,
      success: true,
      msg: message.success,
      code: Errors.NONE,
    });
  } catch (e) {
    console.log("\nError while fetching!\n", e);

    return new Result({
      data: [],
      success: false,
      msg: message.dbServer,
      code: Errors.DB_SERVER,
    });
  }
}

/**
 * This function prepares a generic row update based on the inputs.
 * This function can update none, one, or more rows based on an SQL command and passed-in parameters.
 *
 * @param {string} sql
 * @param {Array<string | number | boolean>} params
 * @param {Message} message
 */
async function update(
  sql: string,
  params: Array<string | number | boolean> = [],
  message: Messages = defaultMsg
): Promise<Result> {
  console.log(
    "-- The following query is being executed --\n sql: " +
      sql +
      "\n params: " +
      params
  );

  try {
    const result = await db.query(sql, params);

    if (result.rows[0] != null) {
      return new Result({
        data: result.rows,
        success: true,
        msg: message.success,
        code: Errors.NONE,
      });
    }

    return new Result({
      data: result.rows,
      success: false,
      msg: message.dbNotFound,
      code: Errors.DB_DNE,
    });
  } catch (e) {
    console.log("\nError while updating!\n", e);

    return new Result({
      data: [],
      success: false,
      msg: message.dbServer,
      code: Errors.DB_SERVER,
    });
  }
}

/**
 * This function acts as a generic insert into the database.
 *
 * @param {string} sql
 * @param {Array<string | number | boolean>} params
 * @param {Message} message
 */
async function create(
  sql: string,
  params: Array<string | number | boolean> = [],
  message: Messages = defaultMsg
): Promise<Result> {
  console.log(
    "-- The following query is being executed --\n sql: " +
      sql +
      "\n params: " +
      params
  );

  try {
    const result = await db.query(sql, params);

    if (result.rows[0] == null) {
      console.log("\n!Nothing was inserted!\n");

      return new Result({
        data: {},
        success: false,
        msg: message.dbNotFound,
        code: Errors.DB_DNE,
      });
    }

    console.log("\nSuccess!\n");

    return new Result({
      data: result.rows,
      success: true,
      msg: message.success,
      code: Errors.NONE,
    });
  } catch (e:any) {
    if (e.code == "23505") {
      console.log("\n!Creation Failure: Duplicate!\n");

      return new Result({
        data: {},
        success: false,
        msg: message.dbDuplicate,
        code: Errors.DB_UNIQUE,
      });
    }

    if (e.code == "42601") {
      console.log(
        "\n!Creation Failure: Improper number of parameters passed in!\n"
      );

      return new Result({
        data: {},
        success: false,
        msg: message.invalidParams,
        code: Errors.DB_INVALID,
      });
    }

    if (e.code == "23503") {
      console.log("\n!Creation Failure: Foreign Key Constraints!\n");

      return new Result({
        data: {},
        success: false,
        msg: message.dbForeign,
        code: Errors.DB_FOREIGN,
      });
    }

    console.log("\nError during creation!\n", message.dbServer, e);

    return new Result({
      data: {},
      success: false,
      msg: message.dbServer,
      code: Errors.DB_SERVER,
    });
  }
}

/**
 * NOTE: this implements the basic delete operation, but we cannot call it delete in JS
 * This function prepares a generic row deletion based on the inputs.
 * This function can delete none, one, or more rows based on an SQL command and passed-in parameters.
 *
 * @param {string} sql
 * @param {Array<string | number>} params
 * @param {Message} message
 */
async function remove(
  sql: string,
  params: Array<string | number> = [],
  message: Messages = defaultMsg
): Promise<Result> {
  console.log(
    "-- The following query is being executed --\n sql: " +
      sql +
      "\n params: " +
      params
  );

  try {
    const result = await db.query(sql, params);

    if (result.rows[0] == null) {
      return new Result({
        data: {},
        success: false,
        msg: message.dbNotFound,
        code: Errors.DB_DNE,
      });
    }

    return new Result({
      data: result.rows,
      success: true,
      msg: message.success,
      code: Errors.NONE,
    });
  } catch (e) {
    console.log("\n!Deletion error!\n", message.dbServer, e);

    return new Result({
      data: {},
      success: false,
      msg: message.dbServer,
      code: Errors.DB_SERVER,
    });
  }
}

export default {
  retrieve: retrieve,
  update: update,
  create: create,
  remove: remove,
  getOperator: getOperator,
  paginate: paginate,
};

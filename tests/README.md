This folder contains tests for the backend apis.

## Setup
We are using the [jest]((https://jestjs.io/docs/getting-started) ) framework to test our apis. See `lesson-tests.js` for a reference on how to write out the tests. Ensure that are functional tests are minimal. If you are using multiple APIs in a test, ensure that you have already tested all but one of them in previous tests. If this is not possible, consider your test design choice, it may need to be refactored.

The database is cleaned and restarted every time the test script is run. `setup.js` contains mock data which is automatically inserted into the database before the tests are run. `utils.js` contains any utility functions that can be used throughout multiple test files. `api.test.js` is the main testing file and is used to run all of the tests.

## Execution
To run these tests use the command `sh run_tests.sh` from the parent folder.

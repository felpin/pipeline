# PIPELINE

A simple implementation of a pipeline of orders.

## Running

To run this project, first make sure you have [yarn](https://yarnpkg.com/en/) installed.

```bash
yarn --version
```

Then download the project and install all the dependencies with the following command.

```bash
yarn
```

Before running the project for the first time, it is required to set some environment variables.
It can easily be done by adding a file named `.env` at the root folder of the project. The content of
this file should be:

```text
REACT_APP_API_URL=<Base URL of the API to fetch data>
REACT_APP_CREDENTIALS_EMAIL=<A valid e-mail to login in the API>
REACT_APP_CREDENTIALS_PASSWORD=<A valid password to login in the API>
```

With environment variables set, just run:

```bash
yarn start
```

## Testing

There are a few tests on the projects and they are run by [jest](https://jestjs.io/) (which comes by
default with create-react-app).

To run the tests, execute the command:

``` bash
yarn test
```


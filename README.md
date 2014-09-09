ngin_client_node [![Build Status](https://travis-ci.org/sportngin/ngin_client_node.png)](https://travis-ci.org/sportngin/ngin_client_node)
================

## Installation

```
npm install ngin_client
```

###Note:
Ngin Client Node will not work with node version 0.6.x

## Contributing

If you add code, please add tests. Pull requests will not be accepted without
tests and an updated coverage report.

### Linking to a Local App

  - Get the repo: `git clone git@github.com:sportngin/ngin_client_node.git`
  - From the new Ngin Client repo (you only need to do this once): `npm link`
  - Link Ngin Client __from your app repo__: `npm link ngin_client`
  - Rebuild to local app (i.e. `grunt dev`)
  - When you are done with your feature, use `npm unlink ngin_client` __from your app repo__ to break the link to your local Ngin Client repo (and use the packaged version again)

### Running Tests

```
npm test
```

### Running the coverage report

```
npm run-script coverage
```

[View current test coverage](https://rawgithub.com/sportngin/ngin_client_node/master/coverage.html)

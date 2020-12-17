# Widget Powerbar

## Getting Started

Install dependencies:

```sh
npm i
```

## Development Setup

This command runs development server on `http://localhost:3000`.

```sh
npm run start
```

Widget started on development server doesn't provide you with whole functional. Since widgets depend on communication between them there are several limitations.
You can check these limitations by opening `Communication` file. There you can find messages we expect to receive from other widgets or methods we use to send information to other widgets. In development mode you can mock messages by using method `window.windowProxy.post([message])` in a browser console.

## Running the tests

```sh
npm run test
```

This command runs jest tests.

### And coding style tests

To run tslint linting use the following command:

```
npm run lint
```

## Deployment

[TODO]

## Built With

- [Typescript](https://www.typescriptlang.org/) - Typed JavaScript
- [Inferno and Inferno-Compat](https://infernojs.org/) - React-like library for building high-performance user interfaces
- [Redux](https://redux.js.org/) - Dependency Management
- [styled-components](https://www.styled-components.com/) - CSS in JS

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

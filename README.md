# Redux-Vertical

[![Greenkeeper badge](https://badges.greenkeeper.io/BerkeleyTrue/redux-vertical.svg)](https://greenkeeper.io/) [![Coverage Status](https://coveralls.io/repos/github/BerkeleyTrue/redux-vertical/badge.svg?branch=master)](https://coveralls.io/github/BerkeleyTrue/redux-vertical?branch=master)

Build large redux apps using vertically separated features.

## Install

```bash
npm install --save redux-vertical
```

## Usage

```jsx
import { createTypes, createAsyncTypes } from 'redux-vertical';

// we namespace all our types
// you no longer have to worry about action types clashing
export const namespace = 'app';
export const types = createTypes(
  [
    'openModal',
    'handleClick',
    'updateEmailSettings',
    // this will create types for multiple stages of an async side effect
    createAsyncTypes('fetch')
  ],
  // namespace will prefix all our types!
  namespace
);
// types will look like the following
// types = {
//   openModal: 'app.openModal',
//   handleClick: 'app.handleClick',
//   updateEmailSettings: 'app.updateEmailSettings'
//   // our async types
//   fetch: {
//     // multple namespaced actions are created by createAsyncTypes
//     start: 'app.fetch.start',
//     next: 'app.fetch.next',
//     error: 'app.fetch.error',
//     complete: 'app.fetch.compelete',
//     // this allows you to use just the type without the async stages
//     toString() { return 'app.fetch'; }
//    }
// };

export const openModal = () => ({ type: types.openModal });
export const handleClick = () => ({ type: types.handleClick });
export const updateEmailSettings = () => ({ type: types.updateEmailSettings });
export const fetch = () => ({ type: types.fetch });
export const startFetch = () => ({ type: types.fetch.start });
export const fetchCompleted = () => ({ type: types.fetch.complete });
export const fetchHasErrored = () => ({ type: types.fetch.error });
export const fetchReturnedAValue = () => ({ type: types.fetch.next });
```


## API


### config

An object with defaults for the delimiter as well as the async type value
changing the value of these properties will allow you to set the default
throughout your project.

```js
const config = {
  delimiter: '.',
  start: 'start',
  next: 'next',
  compelete: 'complete',
  error: 'error'
};
```

### createTypes

A function that takes three inputs and returns an object where the keys
correspond to action types.

* `types`: Required - an array of strings or objects created using the `createAsyncTypes`
  function
* `namespace`: Required - A String used to namespace (prefix) types.
* `delimiter`: A string used between the prefix and the type. Defaults to
  `config.delimiter`

```js
createTypes(
  types: [...String|AsyncTypesObject],
  namespace: String,
  delimiter?: String = config.delimiter
) => ({
  [type]: namespace + delimiter + type,
  [type]: AsyncTypesObject
})
```

### createAsyncTypes

A function that takes a type and returns an object with postfix stages.

* `type`: Required - A string representing an async side-effect
* `delimiter`: A string used to join the async type to the different stages

The type is postfixed by the following stages

* start
* next
* complete
* error

These four postfixed types should cover most async methods in JavaScript
including Promises, callbacks, and Observables;

The value postfixed to your type can be changed globally by changing the associated values on the
`config` object described above.

```js
createAsyncTypes(
  type: String,
  delimiter?: String = config.delimiter
) => ({
  start: String,
  next: String,
  complete: String,
  error: String,
  toString: () => type
});
```
## Prior Work

This project is a derivative of [redux-actions](https://github.com/reduxactions/redux-actions) with some additional API and some slight modifications to make those functions work exclusive of Symbol types. As such this library will not work with Symbol type actions.


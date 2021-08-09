# Redux-Vertical

[![Coverage Status](https://coveralls.io/repos/github/BerkeleyTrue/redux-vertical/badge.svg?branch=main)](https://coveralls.io/github/BerkeleyTrue/redux-vertical?branch=main)

Build large Redux apps using vertically separated features.

## Install

```bash
npm install --save redux-vertical
```

## Usage

```jsx
import { createTypes } from 'redux-vertical';

// we namespace all our types
// you no longer have to worry about action types clashing
export const namespace = 'app';
export const types = createTypes(
  // namespace will prefix all our types!
  namespace
  [
    'openModal',
    'handleClick',
    'updateEmailSettings',
  ],
);
// types will look like the following
// types = {
//   openModal: 'app.openModal',
//   handleClick: 'app.handleClick',
//   updateEmailSettings: 'app.updateEmailSettings'
// };
```


## API

Comming soon

## Prior Work

This project is a derivative of [redux-actions](https://github.com/reduxactions/redux-actions) with some additional API and some slight modifications to make those functions work exclusive of Symbol types. As such this library will not work with Symbol type actions.


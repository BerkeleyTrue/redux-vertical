<a name="4.0.0"></a>
# [4.0.0](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v3.2.0...v4.0.0) (2017-11-08)


### Features

* Adds `addNS` ([7537b46](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/7537b46))


### BREAKING CHANGES

* This changes the internal behavior of functions when
dealing with ns. If using this library to add ns to reducers then you
should be fine. But to be safe this is being released as breaking



<a name="3.2.0"></a>
# [3.2.0](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v3.1.2...v3.2.0) (2017-10-14)


### Features

* **createAction:** Adds createAction ([7d153dd](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/7d153dd))
* **handleActions:** Should work with async type object ([6daca60](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/6daca60))



<a name="3.1.2"></a>
## [3.1.2](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v3.1.1...v3.1.2) (2017-09-09)


### Bug Fixes

* Remove reduce-reducer ([7dd4a05](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/7dd4a05))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v3.1.0...v3.1.1) (2017-09-08)


### Bug Fixes

* **combineReducers:** Should not mutate state ([3a72d65](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/3a72d65))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v3.0.1...v3.1.0) (2017-09-08)


### Features

* **build:** Use babel-plugin-lodash ([d86c764](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/d86c764))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v3.0.0...v3.0.1) (2017-09-08)


### Bug Fixes

* **combineReducers:** Should respect oldState ([0ace3e9](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/0ace3e9))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v2.1.0...v3.0.0) (2017-09-05)


### Features

* **combineReducers:** Filter out duplicates ([bec9b26](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/bec9b26))


### BREAKING CHANGES

* **combineReducers:** combinedReducer will no longer throw for duplicated
combined reducer



<a name="2.1.0"></a>
# [2.1.0](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v2.0.0...v2.1.0) (2017-09-05)


### Features

* **combineReducers:** Throw when double combinedReducers ([a280c38](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/a280c38))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v1.0.0...v2.0.0) (2017-09-05)


### Features

* **handleActions:** Defer createHandlers call ([30cd6df](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/30cd6df))


### BREAKING CHANGES

* **handleActions:** Changes handleActions API



<a name="1.0.0"></a>
# [1.0.0](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v0.2.0...v1.0.0) (2017-09-01)


### Features

* **reducers:** Delete createReducerCache ([0f060b7](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/0f060b7))


### BREAKING CHANGES

* **reducers:** Removes createReducerCache in favor of combineReducers



<a name="0.2.0"></a>
# [0.2.0](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v0.1.2...v0.2.0) (2017-08-31)


### Features

* Add composeReducers func ([340abc3](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/340abc3))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v0.1.1...v0.1.2) (2017-08-31)


### Bug Fixes

* **package.json:** Correct main folder ([876b859](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/876b859))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/BerkeleyTrue/berkeleys-redux-utils/compare/v0.1.0...v0.1.1) (2017-08-31)


### Bug Fixes

* **npm:** Add ignore to not ignore lib ([52b1615](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/52b1615))



<a name="0.1.0"></a>
# 0.1.0 (2017-08-31)


### Bug Fixes

* **eslintrc:** Remove parserOption ([adf7c47](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/adf7c47))
* **package.json:** Change to prepubOnly ([7676c4d](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/7676c4d))


### Features

* Add more utils ([4f2961f](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/4f2961f))
* Init lerna app ([3fb553b](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/3fb553b))
* Remove lerna, make it one repo ([f70e655](https://github.com/BerkeleyTrue/berkeleys-redux-utils/commit/f70e655))




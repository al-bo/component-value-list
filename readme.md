Value list component
====================

[![build status](https://img.shields.io/travis/magsdk/component-value-list.svg?style=flat-square)](https://travis-ci.org/magsdk/component-value-list)
[![npm version](https://img.shields.io/npm/v/mag-component-value-list.svg?style=flat-square)](https://www.npmjs.com/package/mag-component-value-list)
[![dependencies status](https://img.shields.io/david/magsdk/component-value-list.svg?style=flat-square)](https://david-dm.org/magsdk/component-value-list)
[![devDependencies status](https://img.shields.io/david/dev/magsdk/component-value-list.svg?style=flat-square)](https://david-dm.org/magsdk/component-value-list?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/magsdk)


Value list is a component to build user interface, an instance of [Component](https://github.com/stbsdk/component) module.


## Installation ##

```bash
npm install mag-component-value-list
```


## Usage ##

Add the constructor to the scope:

```js
var ValueList = require('mag-component-value-list');
```

Create scroll area instance:

```js
var valueList = new ValueList({
    data: [11, 22, 35, 56, 78],
    cycle: true,
    render: function ( $body ) {
        $body.innerText = 'Number: ' + this.current.value;
    }
});
```


## Development mode ##

> There is a global var `DEVELOP` which activates additional consistency checks and protection logic not available in release mode.


## Contribution ##

If you have any problem or suggestion please open an issue [here](https://github.com/magsdk/component-value-list/issues).
Pull requests are welcomed with respect to the [JavaScript Code Style](https://github.com/DarkPark/jscs).


## License ##

`mag-component-value-list` is released under the [MIT License](license.md).

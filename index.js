/**
 * @license The MIT License (MIT)
 * @copyright Boris Aleynikov <aleynikov.boris@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var Component = require('stb-component'),
    keys      = require('stb-keys');


/**
 * Value list implementation
 *
 * @constructor
 * @extends Component
 *
 * @param {Object}   [config={}]          init parameters (all inherited from the parent)
 * @param {Array} [config.data] data to display
 * @param {function} [config.render] function to render data
 * @param {number} [config.index] index of start position to display data
 */
function ValueList ( config ) {

    config = config || {};

    if ( DEVELOP ) {
        if ( typeof config !== 'object' ) {
            throw new Error(__filename + ': wrong config type');
        }
        // init parameters checks
        if ( 'className' in config && (!config.className || typeof config.className !== 'string') ) {
            throw new Error(__filename + ': wrong or empty config.className');
        }
    }

    //config.className = 'valueList ' + (config.className || '');

    /**
     * Component data
     *
     * @type {Array}
     */
    this.data = [];

    /**
     * Current data index
     *
     * @type {number}
     */
    this.currentIndex = 0;

    /**
     * Current value
     *
     * @type {null}
     */
    this.current = null;

    /**
     *
     * @type {boolean}
     */
    this.cycle = false;

    Component.call(this, config);

    this.init(config);
}

// inheritance
ValueList.prototype = Object.create(Component.prototype);
ValueList.prototype.constructor = ValueList;

// set component name
ValueList.prototype.name = 'mag-component-value-list';


/**
 * Make all the data items identical.
 * Wrap to objects if necessary.
 *
 * @param {Array} data incoming array
 * @return {Array} reworked incoming data
 */
function normalize ( data ) {
    var index, item;

    if ( DEVELOP ) {
        if ( arguments.length !== 1 ) {
            throw new Error(__filename + ': wrong arguments number');
        }
        if ( !Array.isArray(data) ) {
            throw new Error(__filename + ': wrong data type');
        }
    }

    // rows
    for ( index = 0; index < data.length; index++ ) {
        // cell value
        item = data[index];
        // primitive value
        if ( typeof item !== 'object' ) {
            // wrap with defaults
            item = data[index] = {
                value: data[index]
            };
        }
    }

    return data;
}


/**
 * Init or reinit component
 *
 * @param {Object} config of component
 */
ValueList.prototype.init = function ( config ) {

    if ( config.cycle ) { this.cycle = config.cycle; }

    if ( config.render ) {
        // apply render function
        this.renderValue = config.render;
    }

    if ( config.data ) {
        if ( DEVELOP ) {
            if ( config.index && config.index > config.data.length - 1 || config.index < 0 ) {
                throw new Error(__filename + ': config.index should be positive and less then data size');
            }
            if ( config.render && typeof config.render !== 'function' ) {
                throw new Error(__filename + ': wrong config.render type');
            }
            if ( config.data && !Array.isArray(config.data) ) {
                throw new Error(__filename + ': wrong data type');
            }
        }

        this.data = normalize(config.data);
        if ( config.index ) {
            this.currentIndex = config.index;
        }
        this.current = this.data[this.currentIndex];
        // no render if no data
        this.updateData();
    }
};


/**
 * Default render function
 *
 * @param {Element} $body item DOM link
 */
ValueList.prototype.renderValueDefault = function ( $body ) {
    $body.innerText = this.current.value;
};


/**
 * Method to render data
 * Can be redefined to provide custom rendering.
 *
 * @type {function}
 */
ValueList.prototype.renderValue = ValueList.prototype.renderValueDefault;


/**
 * Update current display data
 */
ValueList.prototype.updateData = function () {
    this.renderValue(this.$body);
    /**
     * Change current data
     *
     * @event
     *
     * @type {Object}
     * @property {object} current data
     */
    this.emit('data:change', {current: this.current});
};


/**
 * List of all default event callbacks.
 *
 * @type {Object.<string, function>}
 */
ValueList.prototype.defaultEvents = {
    keydown: function ( event ) {
        switch ( event.code ) {
            case keys.down:
            case keys.up:
                this.change(event.code);
                break;
        }
    }
};


/**
 * Attempt to go beyond the edge of the list.
 *
 * @event overflow
 *
 * @type {Object}
 * @property {number} direction key code initiator of movement
 * @property {boolean} cycle if cycle change happen
 */

/**
 * Change display data
 *
 * @param {number} direction to change data
 * @fires overflow
 */
ValueList.prototype.change = function ( direction ) {
    switch ( direction ) {
        case keys.down:
            if ( this.currentIndex + 1 < this.data.length ) {
                this.currentIndex++;
                this.current = this.data[this.currentIndex];
                this.updateData();
            } else {
                if ( this.cycle ) {
                    this.currentIndex = 0;
                    this.current = this.data[0];
                    this.updateData();
                }
                this.emit('overflow', {direction: direction, cycle: this.cycle});
            }
            break;
        case keys.up:
            if ( this.currentIndex > 0) {
                this.currentIndex--;
                this.current = this.data[this.currentIndex];
                this.updateData();
            } else {
                if ( this.cycle ) {
                    this.currentIndex = this.data.length - 1;
                    this.current = this.data[this.currentIndex];
                    this.updateData();
                }
                this.emit('overflow', {direction: direction, cycle: this.cycle});
            }
            break;
    }
};


module.exports = ValueList;

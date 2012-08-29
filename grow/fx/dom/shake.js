// Copyright 2012 Adam Mcgrath

/**
 * @fileoverview Shake an element from side to side
 * (Note the element must have absolute or relative positioning).
 *
 * Usage:
 *   var shake = new grow.fx.dom.Shake(myElement);
 *   shake.play();
 *
 * @author adamjmcgrath@gmail.com (Adam Mcgrath)
 */

goog.provide('grow.fx.dom.Shake');

goog.require('goog.fx.dom.Slide');



/**
 * Shake constructor.
 * @param {Element} element The element to shake.
 * @param {number=} opt_shakes The number of times to shake the element (An
 *     entire journey from one side to the other represents 1 shake).
 * @param {number=} opt_distance The max distance to shake the element.
 * @param {number=} opt_time The time for the shaking to last.
 * @constructor
 * @extends {goog.fx.AnimationSerialQueue}
 */
grow.fx.dom.Shake = function(element, opt_shakes, opt_distance, opt_time) {

  var acc = this.getAccelerationFunction_(opt_shakes || grow.fx.dom.Shake.SHAKES_);

  goog.base(this, element, [0, 0], [opt_distance || grow.fx.dom.Shake.DISTANCE_, 0],
      opt_time || grow.fx.dom.Shake.TIME_, acc)
};
goog.inherits(grow.fx.dom.Shake, goog.fx.dom.Slide);


/**
 * Default number of times for the shake effect.
 * @type {number}
 * @private
 */
grow.fx.dom.Shake.SHAKES_ = 4;


/**
 * Default max distance in px for the shake effect.
 * @type {number}
 * @private
 */
grow.fx.dom.Shake.DISTANCE_ = 15;


/**
 * Default time in ms for the shake effect to last.
 * @type {number}
 * @private
 */
grow.fx.dom.Shake.TIME_ = 400;


/**
 * Create the accelration function.
 * @private
 */
grow.fx.dom.Shake.prototype.getAccelerationFunction_ = function(shakes) {
  shakes = shakes * 2;
  return function(n) {
    return Math.sin(n * shakes * Math.PI);
  }
};

// Copyright 2012 Adam Mcgrath

/**
 * @fileoverview Shake an element like a polaroid picture...
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
 * The Shake animation constructor. It's basically a slide animation with a
 * different signature and easing function.
 * @param {Element} element Dom Node to be used in the animation.
 * @param {number=} opt_shakes The number of times to shake the element (An
 *     entire journey from the center to one side, then to the other and back
 *     to the center represents 1 "shake").
 * @param {number=} opt_distance The maximum horizontal distance to shake.
 * @param {number=} opt_time Length of animation in milliseconds.
 * @constructor
 * @extends {goog.fx.dom.Slide}
 */
grow.fx.dom.Shake = function(element, opt_shakes, opt_distance, opt_time) {
  var shakes = opt_shakes || grow.fx.dom.Shake.SHAKES_;
  var distance = opt_distance || grow.fx.dom.Shake.DISTANCE_;
  var acc = this.createAccelerationFunction_(shakes);
  var time = opt_time || grow.fx.dom.Shake.TIME_;

  goog.base(this, element, [0, 0], [distance, 0], time, acc);
};
goog.inherits(grow.fx.dom.Shake, goog.fx.dom.Slide);


/**
 * Default number of shakes.
 * @type {number}
 * @private
 */
grow.fx.dom.Shake.SHAKES_ = 3;


/**
 * Default max horizontal distance in px for the shake effect.
 * @type {number}
 * @private
 */
grow.fx.dom.Shake.DISTANCE_ = 12;


/**
 * Default time in ms for the shake effect to last.
 * @type {number}
 * @private
 */
grow.fx.dom.Shake.TIME_ = 350;


/**
 * Create the acceleration function.
 * @param {number} shakes The number of times to shake the element.
 * @return {function(number): number} Output between 0 and 1.
 * @private
 */
grow.fx.dom.Shake.prototype.createAccelerationFunction_ = function(shakes) {
  // Double the number of shakes to get the number of back and forths
  // (1 back and forth equals a journey from 0 to 1 and back to 0).
  shakes = shakes * 2;

  // Create a sinusodal function that swings back and forth as n goes from
  // 0 to 1, see: {@link https://www.google.com/#q=sin(x*2*pi)}.
  return function(n) {
    return Math.sin(n * shakes * Math.PI);
  }
};

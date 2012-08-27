// Copyright 2012 Adam Mcgrath

/**
 * @fileoverview Shake an element from side to side
 * (Note the element must have absolute or relative positioning).
 *
 * Usage:
 *   var shake = new grow.fx.Shake(myElement);
 *   shake.play();
 *
 * @author adamjmcgrath@gmail.com (Adam Mcgrath)
 */

goog.provide('grow.fx.Shake');

goog.require('goog.fx.AnimationSerialQueue');
goog.require('goog.fx.dom.Slide');
goog.require('goog.fx.easing');



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
grow.fx.Shake = function(element, opt_shakes, opt_distance, opt_time) {
  goog.base(this);

  /**
   * @type {Element}
   * @private
   */
  this.element_ = element;

  /**
   * @type {number}
   * @private
   */
  this.shakes_ = opt_shakes || grow.fx.Shake.SHAKES_;

  /**
   * @type {number}
   * @private
   */
  this.distance_ = opt_distance || grow.fx.Shake.DISTANCE_;

  /**
   * @type {number}
   * @private
   */
  this.time_ = opt_time || grow.fx.Shake.TIME_;

  this.init_();
};
goog.inherits(grow.fx.Shake, goog.fx.AnimationSerialQueue);


/**
 * Default number of times for the shake effect.
 * @type {number}
 * @private
 */
grow.fx.Shake.SHAKES_ = 3;


/**
 * Default max distance in px for the shake effect.
 * @type {number}
 * @private
 */
grow.fx.Shake.DISTANCE_ = 15;


/**
 * Default time in ms for the shake effect to last.
 * @type {number}
 * @private
 */
grow.fx.Shake.TIME_ = 200;


/**
 * Create the animation.
 * @private
 */
grow.fx.Shake.prototype.init_ = function() {
  // The start left and end left of the current animation.
  var start = 0;
  var end = this.distance_;

  // The time for the animation to last. The first and last animations cover
  // half the distance so are half the time.
  var time;

  // One 'shake' is a complete journey from max left to min left and back
  // plus the initial jorney to the max and the journey back from the min.
  var shakes = (this.shakes_ * 2) + 2;

  // The total distance travelled during the shake.
  var totalDistance = shakes * this.distance_;

  // Loop through the number of shakes and create a slide animation for each
  // one and add it to the serial animation queue.
  for (var i = 1; i <= shakes; i++) {;

    if (i == shakes) {
      // The last animation should return to it's original position.
      end = 0;
    } else {
      // Otherwise the desitination should be in the opposite direction as
      // the last destination.
      end *= -1;
    }

    // Calculate the time for the animation using the distance to travel.
    time = parseInt((Math.abs(end - start) / totalDistance) * this.time_, 10);

    this.add(new goog.fx.dom.Slide(
        this.element_, [start, 0], [end, 0], time, goog.fx.easing.inAndOut));

    // Keep track of the elements position.
    start = end;
  }
};

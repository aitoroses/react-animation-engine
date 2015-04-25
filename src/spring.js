import TransitionableMixin from './mixin';
import Transitionable from './transitionable';
import Easing from 'famous/transitions/Easing';

var SpringTransition = require('famous/transitions/SpringTransition');
var WallTransition = require('famous/transitions/WallTransition');
var SnapTransition = require('famous/transitions/SnapTransition');

Transitionable.registerMethod('spring', SpringTransition);
Transitionable.registerMethod('wall', WallTransition);
Transitionable.registerMethod('snap', SnapTransition);

export {
    TransitionableMixin,
    Transitionable,
    Easing
}

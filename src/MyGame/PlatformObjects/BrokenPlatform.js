/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function BrokenPlatform(t, atX, atY, w, h) {
    Platform.call(this, t, atX, atY, w, h);
}
gEngine.Core.inheritPrototype(BrokenPlatform, Platform);

BrokenPlatform.prototype.beingHit = function () {
    this.setVisibility(false);
};

BrokenPlatform.prototype.draw = function (aCamera) {
    Platform.prototype.draw.call(this, aCamera);
};





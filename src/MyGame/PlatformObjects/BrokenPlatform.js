/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function BrokenPlatform(t, atX, atY, w, h) {
    SpriteObj.call(this, t, atX, atY, w, h, [0, 40, 1024 - h, 1024]);
}
gEngine.Core.inheritPrototype(BrokenPlatform, SpriteObj);

BrokenPlatform.prototype.beingHit = function () {
    this.setVisibility(false);
};

BrokenPlatform.prototype.draw = function (aCamera) {
    SpriteObj.prototype.draw.call(this, aCamera);
};





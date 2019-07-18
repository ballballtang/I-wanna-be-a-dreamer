/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function NormalPlatform(t, atX, atY, w, h) {
    Platform.call(this, t, atX, atY, w, h);
}
gEngine.Core.inheritPrototype(NormalPlatform, Platform);

NormalPlatform.prototype.disappear = function () {
    this.setVisibility(false);
    //console.log("disappear");
};

NormalPlatform.prototype.draw = function (aCamera) {
    Platform.prototype.draw.call(this, aCamera);
};

NormalPlatform.prototype.update = function () {
    Platform.prototype.update.call(this);
};





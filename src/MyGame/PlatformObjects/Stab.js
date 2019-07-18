/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function Stab(t, atX, atY, w, h, rotate) {
    Platform.call(this, t, atX, atY, w, h);
    
    this.getXform().incRotationByDegree(rotate);
}
gEngine.Core.inheritPrototype(Stab, Platform);

Stab.prototype.setInvisible = function () {
    this.setVisibility(false);
};

Stab.prototype.draw = function (aCamera) {
    Platform.prototype.draw.call(this, aCamera);
};

Stab.prototype.update = function () {
    Platform.prototype.update.call(this);
};


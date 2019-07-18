/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function Stab(t, atX, atY, w, h, rotate) {
    SpriteObj.call(this, t, atX, atY, w, h, [0, 39, 48, 87]);
    
    this.getXform().incRotationByDegree(rotate);
}
gEngine.Core.inheritPrototype(Stab, SpriteObj);

Stab.prototype.setInvisible = function () {
    this.setVisibility(false);
};

Stab.prototype.draw = function (aCamera) {
    SpriteObj.prototype.draw.call(this, aCamera);
};

Stab.prototype.update = function () {
    SpriteObj.prototype.update.call(this);
};


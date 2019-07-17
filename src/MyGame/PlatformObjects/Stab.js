/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function Stab(t, atX, atY, w, h, rotate) {
    Platform.call(this, t, atX, atY, w, h);
    this.getRigidBody().setMass(0.0);
    this.getRigidBody().setInertia(2);
    this.getRigidBody().setFriction(.2);
    this.getRigidBody().setRestitution(.7);
    
    this.getXform().incRotationByDegree(rotate);
}
gEngine.Core.inheritPrototype(Stab, GameObject);

Stab.prototype.setInvisible = function () {
    this.setVisibility(false);
};

Stab.prototype.fall = function () {
    this.getRigidBody().setVelocity(0, -10);
    //console.log("falling");
};

Stab.prototype.flyOut = function () {
    //console.log("flyout");
    this.setVisibility(true);
    //console.log(this.mStab.isVisible());
    this.getRigidBody().setVelocity(10, 0);
};

Stab.prototype.draw = function (aCamera) {
    Platform.prototype.draw.call(this, aCamera);
};

Stab.prototype.update = function () {
    this.getRigidBody().travel();
};


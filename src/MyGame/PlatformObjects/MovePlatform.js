/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function MovePlatform(t, atX, atY, w, h, s, e) {
    Platform.call(this, t, atX, atY, w, h)
    
    this.getRigidBody().setMass(0);
    this.getRigidBody().setInertia(2);
    this.getRigidBody().setFriction(.2);
    this.getRigidBody().setRestitution(.7);
    
    this.mVP.setXV(120);
    this.mstart = s;
    this.mend = e;
}
gEngine.Core.inheritPrototype(MovePlatform, GameObject);

MovePlatform.prototype.draw = function (aCamera) {
    Platform.prototype.draw.call(this, aCamera);
};

MovePlatform.prototype.update = function () {
    var xf = this.getXform();

    this.mVP.update();
    if (xf.getXPos() <= this.mstart) {
        this.mVP.setXV(- this.mVP.mV[0])
    }
    if (xf.getXPos() >= this.mend) {
        this.mVP.setXV(- this.mVP.mV[0])
    }
};


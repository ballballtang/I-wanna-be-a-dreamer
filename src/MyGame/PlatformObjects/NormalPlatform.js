/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function NormalPlatform(t, atX, atY, w, h) {
    Platform.call(this, t, atX, atY, w, h);
      
    this.getRigidBody().setMass(0.0);
    this.getRigidBody().setInertia(2);
    this.getRigidBody().setFriction(.2);
    this.getRigidBody().setRestitution(.7);
}
gEngine.Core.inheritPrototype(NormalPlatform, GameObject);

NormalPlatform.prototype.disappear = function () {
    this.setVisibility(false);
    //console.log("disappear");
};

NormalPlatform.prototype.fall = function () {
    this.getRigidBody().setVelocity(0, -10);
};

NormalPlatform.prototype.open = function () {
    this.getRigidBody().setAngularVelocity(0.8);
};

NormalPlatform.prototype.draw = function (aCamera) {
    Platform.prototype.draw.call(this, aCamera);
};

NormalPlatform.prototype.update = function () {
//    this.getRigidBody().travel();
//    var rad = this.getXform().getRotationInDegree();
    //console.log(rad);
    
//    if (rad >= 90) {
//        this.getRigidBody().setAngularVelocity(0);
//        this.disappear();
//    }
//    if (this.getXform().getYPos() <= 5) {
//        this.disappear();
//    }
    //gEngine.Physics.processCollision(this.mNormalPlatform,[]);
};





/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject */

"use strict";

function Platform(t, atX, atY, w, h) {
    this.mPlatform = new TextureRenderable(t);
    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setSize(w, h);
    GameObject.call(this, this.mPlatform);
    var r = new RigidRectangle(this.getXform(), w, h);
    this.setRigidBody(r);
}
gEngine.Core.inheritPrototype(Platform, GameObject);

Platform.prototype.update = function () {
    GameObject.prototype.update.call(this);
};



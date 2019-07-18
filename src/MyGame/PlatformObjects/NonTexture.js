/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine */

"use strict";

function NonTexture(atX, atY, w, h) {
    this.mNonTexture = new Renderable();
    this.mNonTexture.setColor([1, 1, 1, 0]);
    this.mNonTexture.getXform().setPosition(atX, atY);
    this.mNonTexture.getXform().setSize(w, h);
    GameObject.call(this, this.mNonTexture);
}
gEngine.Core.inheritPrototype(NonTexture, GameObject);

NonTexture.prototype.update = function () {
    GameObject.prototype.update.call(this);
};
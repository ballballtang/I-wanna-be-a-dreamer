"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bullet(spriteTexture, atX, atY) {
    this.kWdith = 5;
    this.kHeight = 5;
    
    this.mBullet = new SpriteRenderable(spriteTexture);
    this.mBullet.setColor([1, 1, 1, 0]);
    this.mBullet.getXform().setPosition(atX, atY);
    this.mBullet.getXform().setSize(this.kWdith, this.kHeight);
    this.mBullet.setElementPixelPositions(0, 16, 0, 16);

    GameObject.call(this, this.mBullet);
    
    this.mVP = new VProcessor(this.getXform(), 0);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.draw = function (Camera) {
    GameObject.prototype.draw.call(this, Camera);
};

Hero.prototype.update = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.mVP.setXV(-120 * this.kMirror);
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Left)) {
        this.mVP.setXV(0);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.mVP.setXV(120 * this.kMirror);
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Right)) {
        this.mVP.setXV(0);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if (this.mInAir && this.mJumpTime == 0) this.mJumpTime = 1;
        this.mJumpTime++;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space) && this.mHoldSpace > 0 && this.mJumpTime <= 2) {
        this.mHoldSpace--;
        if (this.mJumpTime == 1) this.mVP.setYV(370 * this.kMirror);
        if (this.mJumpTime == 2) this.mVP.setYV(280 * this.kMirror);
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
        this.mHoldSpace = 9;
    }
    
    this.mVP.update();
};
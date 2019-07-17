"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, atX, atY, mirror) {
    this.kWdith = 28;
    this.kHeight = 40;
    this.kMirror = mirror;
    
    this.mIsDead = false;
    this.mIsGoingLeft = false;
    this.mIsGoingUp = false;
    this.mIsGoingRight = false;
    
    this.mHoldSpace = 10;
    this.mJumpTime = 0;
    this.mInAir = true;
    this.mFacing = mirror;
    
    this.mHero = new SpriteRenderable(spriteTexture);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(atX, atY);
    this.mHero.getXform().setSize(this.kWdith, this.kHeight);
    this.mHero.setElementPixelPositions(0, 16, 0, 16);

    GameObject.call(this, this.mHero);
    
    this.mBulletSet = new BulletSet(spriteTexture, this.getXform().getPosition());
    
    this.mVP = new VProcessor(this.getXform(), -2300 * this.kMirror);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.cleanStatus = function (aCamera) {
    var cHeight = aCamera.getWCHeight();
    var cWidth = aCamera.getWCWidth();
    
    this.mIsDead = false;
    if (this.mIsGoingUp) {
        this.mIsGoingUp = false;
        this.getXform().incYPosBy(-cHeight);
    }
    if (this.mIsGoingLeft) {
        this.mIsGoingLeft = false;
        this.getXform().incXPosBy(cWidth);
    }
    if (this.mIsGoingRight) {
        this.mIsGoingRight = false;
        this.getXform().incXPosBy(-cWidth);
    }
    
    this.mVP.setV(0, 0);
    this.mBulletSet.clean();
}

Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mBulletSet.draw(aCamera);
};

Hero.prototype.update = function () {
    if (this.mIsDead || this.mIsGoingLeft || this.mIsGoingRight) return;
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.mFacing = - this.kMirror;
        this.mVP.setXV(-210 * this.kMirror);
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Left)) {
        this.mVP.setXV(0);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.mFacing = this.kMirror;
        this.mVP.setXV(210 * this.kMirror);
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
        if (this.mJumpTime == 1) this.mVP.setYV(580 * this.kMirror);
        if (this.mJumpTime == 2) this.mVP.setYV(450 * this.kMirror);
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Space)) {
        this.mHoldSpace = 10;
    }
    
    if (this.mInAir) this.mVP.setAddV(0, 0);
    
    this.mBulletSet.update(this.mFacing);
    this.mVP.update();
    //console.log(this.getXform().getPosition()[1] - this.getXform().getHeight() / 2);
};
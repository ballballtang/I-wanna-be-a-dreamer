"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, mirror) {
    this.kWdith = 28;
    this.kHeight = 40;
    this.kMirror = mirror;
    
    this.mHoldSpace = 10;
    this.mJumpTime = 0;
    this.mInAir = true;
    
    this.mHero = new SpriteRenderable(spriteTexture);
    this.mHero.setColor([1, 1, 1, 0]);
    this.mHero.getXform().setPosition(0, 0);
    this.mHero.getXform().setSize(this.kWdith, this.kHeight);
    this.mHero.setElementPixelPositions(0, 16, 0, 16);

    GameObject.call(this, this.mHero);
    
    this.mVP = new VProcessor(this.getXform(), -2300 * this.kMirror);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.draw = function (Camera) {
    GameObject.prototype.draw.call(this, Camera);
};

Hero.prototype.update = function () {
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.mVP.setXV(-210 * this.kMirror);
    }
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.Left)) {
        this.mVP.setXV(0);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
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
    

    
    this.mVP.update();
    
    console.log(this.getXform().getPosition());
};
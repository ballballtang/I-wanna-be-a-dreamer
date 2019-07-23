"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BossBullet(spriteTexture, atX, atY, bset) {
    this.kWidth = 30;
    this.kHeight = 30;
    this.kBSet = bset;
    this.kBTex = spriteTexture;
    
    this.mIsDead = false;
    
    this.mBossBullet = new SpriteRenderable(spriteTexture);
    this.mBossBullet.setColor([1, 1, 1, 0]);
    this.mBossBullet.getXform().setPosition(atX, atY);
    this.mBossBullet.getXform().setSize(this.kWidth, this.kHeight);
    this.mBossBullet.setElementPixelPositions(0, 64, 0, 64);

    GameObject.call(this, this.mBossBullet);
    
    this.mVP = new VProcessor(this.getXform(), 0);
    this.mVP.mMinV[0] = -500;
    this.mWaitTimer = 0;
    this.mAddTimer = 0;
    this.mCircleTimer = 0;
}
gEngine.Core.inheritPrototype(BossBullet, GameObject);

BossBullet.prototype.moveTowards = function (tx, ty) {
    var disX = tx - this.getXform().getPosition()[0];
    var disY = ty - this.getXform().getPosition()[1];
    var disH = Math.sqrt(disX * disX + disY * disY);
    if (disH <= 1e-6)
        return;
    
    var V = 250;
    this.mVP.setV(V * disX / disH, V * disY / disH);
}

BossBullet.prototype.moveLeft = function() {
    var nx = -700;
    var ny = this.getXform().getYPos();
    this.moveTowards(nx, ny);
}

BossBullet.prototype.setWait = function (w) {
    this.mWaitTimer = w;
}

BossBullet.prototype.setAdd = function (w) {
    this.mVP.setXV(-150);
    this.mAddTimer = w;
}

BossBullet.prototype.setCircle = function (w) {
    this.mCircleTimer = w;
}

BossBullet.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};

BossBullet.prototype.update = function (aCamera) {
    if (this.mWaitTimer > 0) {
        this.mWaitTimer--;
        return;
    }
    if (this.mAddTimer > 0) {
        this.mAddTimer--;
        if (this.mAddTimer === 0) {
            this.mVP.setXA(-300);
        }
    }
    if (this.mCircleTimer > 0) {
        this.mCircleTimer--;
        if (this.mCircleTimer === 0) {
            var cx = this.getXform().getXPos();
            var cy = this.getXform().getYPos();
            this.mIsDead = true;
            var maxc = 15;
            for (var i = 0; i < maxc; i++) {
                var aBullet = new BossBullet(this.kBTex, cx, cy, this.kBSet);
                aBullet.moveTowards(cx + Math.cos(2 * Math.PI * i / maxc) * 10, cy + Math.sin(2 * Math.PI * i / maxc) * 10);
                this.kBSet.addToSet(aBullet);
            }
        }
    }
    
    this.mVP.update();
    
    var status = aCamera.collideWCBound(this.getXform(), 1);
    if (status === 0) this.mIsDead = true;
};
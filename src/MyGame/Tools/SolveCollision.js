function SolveCollision(Camera, Hero, MirrorHero, Platforms, Brokens, StabSets) {
    this.mCamera = Camera;
    this.mHero = Hero;
    this.mBulletSet = Hero.mBulletSet;
    this.mMirrorHero = MirrorHero;
    if(this.mMirrorHero !== null) this.mMirrorBullet = MirrorHero.mBulletSet;
    this.mPlatforms = Platforms;
    this.mBrokens = Brokens;
    this.mStabSets = StabSets;
}

SolveCollision.prototype.update = function () {
    this.solveHero(this.mHero, false);
    this.SolveBullets(this.mBulletSet, false);
    this.checkDeath(this.mHero);
    this.checkSceneChange(this.mHero);
    if (this.mMirrorHero !== null) {
        this.solveHero(this.mMirrorHero, true);
        this.SolveBullets(this.mMirrorBullet, true);
    }
};

SolveCollision.prototype.checkSceneChange = function (aHero) {
    var hBottom = aHero.getBBox().minY();
    var hLeft = aHero.getBBox().minX();
    var hRight = aHero.getBBox().maxX();
    var cUp = this.mCamera.getWCCenter()[1] + this.mCamera.getWCHeight() / 2;
    var cLeft = this.mCamera.getWCCenter()[0] - this.mCamera.getWCWidth() / 2;
    var cRight = this.mCamera.getWCCenter()[0] + this.mCamera.getWCWidth() / 2;
    
    if (hBottom > cUp) aHero.mIsGoingUp = true;
    if (hLeft > cRight) aHero.mIsGoingRight = true;
    if (hRight < cLeft) aHero.mIsGoingLeft = true;
}

SolveCollision.prototype.checkDeath = function (aHero) {
    //fall out
    var hUp = aHero.getBBox().maxY();
    var cBottom = this.mCamera.getWCCenter()[1] - this.mCamera.getWCHeight() / 2;
    if (hUp < cBottom) {
        aHero.mIsDead = true;
        return;
    }
    
    //hit a stab
    for (var i = 0; i < this.mStabSets.length; i++) {
        for (var j = 0; j < this.mStabSets[i].size(); j++) {
            if (aHero.pixelTouches(this.mStabSets[i].getObjectAt(j), [])) {
                aHero.mIsDead = true;
                return;
            }
        }
    }
}

SolveCollision.prototype.solveHero = function (aHero, isMirror) {
    var dw = aHero.kWdith / 2;
    var dh = aHero.kHeight / 2;
    var dv = aHero.mVP.mLastFrameV;

    aHero.mInAir = true;
    var plats = this.mPlatforms.concat(this.mBrokens);
    for (var repeat = 0; repeat < 2; repeat++) {
        for (var i = 0; i < plats.length; i++) {
            if (!plats[i].isVisible()) continue;

            var hBox = aHero.getBBox();
            var hPos = aHero.getXform().getPosition();
            var pBox = plats[i].getBBox();

            var status = hBox.boundCollideStatus(pBox);
            var hasLRCol = false;
            if ((status & 1) && !(status & 2)) {
                if (hPos[0] - dw - dv[0] >= pBox.maxX() - 0.0001) {
                    hPos[0] = pBox.maxX() + dw;
                    aHero.mVP.cleanXV();
                    hasLRCol = true;
                }
            }
            if ((status & 2) && !(status & 1)) {
                if (hPos[0] + dw - dv[0] <= pBox.minX() + 0.0001) {
                    hPos[0] = pBox.minX() - dw;
                    aHero.mVP.cleanXV();
                    hasLRCol = true;
                }
            }
            var isOnThisPlat = false;
            if ((status & 4) && !(status & 8) && !hasLRCol) {
                if (hPos[1] + dh - dv[1] <= pBox.minY() + 0.0001) {
                    hPos[1] = pBox.minY() - dh;
                    aHero.mVP.cleanYV();
                    if (isMirror) {
                        aHero.mInAir = false;
                        aHero.mJumpTime = 0;
                        
                        isOnThisPlat = true;
                        aHero.mVP.setAddV(plats[i].mVP.mV[0], plats[i].mVP.mV[1]);
                    } else {
                        if (aHero.mHoldSpace > 1 && aHero.mHoldSpace < 10)
                            aHero.mHoldSpace = 1;
                    }
                }
            }
            if ((status & 8) && !(status & 4) && !hasLRCol) {
                if (hPos[1] - dh - dv[1] * 2 >= pBox.maxY() - 0.0001) {
                    hPos[1] = pBox.maxY() + dh;
                    aHero.mVP.cleanYV();
                    if (!isMirror) {
                        aHero.mInAir = false;
                        aHero.mJumpTime = 0;
                        
                        isOnThisPlat = true;
                        aHero.mVP.setAddV(plats[i].mVP.mV[0], plats[i].mVP.mV[1]);
                    } else {
                        if (aHero.mHoldSpace > 1 && aHero.mHoldSpace < 10)
                            aHero.mHoldSpace = 1;
                    }
                }
            }
        }
    }
};

SolveCollision.prototype.SolveBullets = function (aBulletSet, isMirror) {
    for(var i = 0; i < aBulletSet.size(); i++) {
        var tb = aBulletSet.getObjectAt(i);
        if (tb.mIsDead) continue;
        
        if (this.mCamera.collideWCBound(tb.getXform(), 1) !== 16) {
            tb.mIsDead = true;
        }
    }
    
    for(var i = 0; i < aBulletSet.size(); i++) {
        var tb = aBulletSet.getObjectAt(i);
        if (tb.mIsDead) continue;
        
        for (var j = 0; j < this.mPlatforms.length; j++) {
            if (tb.pixelTouches(this.mPlatforms[j], [])) {
                tb.mIsDead = true;
            }
        }
    }
    
    for(var i = 0; i < aBulletSet.size(); i++) {
        var tb = aBulletSet.getObjectAt(i);
        if (tb.mIsDead) continue;
        
        for (var j = 0; j < this.mBrokens.length; j++) {
            if (!this.mBrokens[j].isVisible()) continue;
            
            if (tb.pixelTouches(this.mBrokens[j], [])) {
                tb.mIsDead = true;
                this.mBrokens[j].beingHit();
            }
        }
    }
    
    for(var i = 0; i < aBulletSet.size(); i++) {
        var tb = aBulletSet.getObjectAt(i);
        if (tb.mIsDead) continue;
        
        for (var j = 0; j < this.mStabSets.length; j++) {
            for (var k = 0; k < this.mStabSets[j].size(); k++) {
                if (tb.pixelTouches(this.mStabSets[j].getObjectAt(k), [])) {
                    tb.mIsDead = true;
                }
            }
        }
    }
};
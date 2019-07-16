function SolveCollision(Camera, Hero, MirrorHero, Platforms) {
    this.mCamera = Camera;
    this.mHero = Hero;
    this.mMirrorHero = MirrorHero;
    this.mPlatforms = Platforms;
}

SolveCollision.prototype.update = function () {
    this.solveHero(this.mHero, false);
    if (this.mMirrorHero !== null)
        this.solveHero(this.mMirrorHero, true);
};

SolveCollision.prototype.solveHero = function (aHero, isMirror) {
    var hBox = aHero.getBBox();
    var hPos = aHero.getXform().getPosition();
    var dw = aHero.kWdith / 2;
    var dh = aHero.kHeight / 2;
    var dv = aHero.mVP.mLastFrameV;

    aHero.mInAir = true;
    for (var i = 0; i < this.mPlatforms.length; i++) {
        var pBox = this.mPlatforms[i].getBBox();

        var status = hBox.boundCollideStatus(pBox);
        if ((status & 1) && !(status & 2)) {
            if (hPos[0] - dw - dv[0] >= pBox.maxX() - 0.0001) {
                hPos[0] = pBox.maxX() + dw;
                aHero.mVP.cleanXV();
            }
        }
        if ((status & 2) && !(status & 1)) {
            if (hPos[0] + dw - dv[0] <= pBox.minX() + 0.0001) {
                hPos[0] = pBox.minX() - dw;
                aHero.mVP.cleanXV();
            }
        }
        if ((status & 4) && !(status & 8)) {
            if (hPos[1] + dh - dv[1] <= pBox.minY() + 0.0001) {
                hPos[1] = pBox.minY() - dh;
                aHero.mVP.cleanYV();
                if (isMirror) {
                    aHero.mInAir = false;
                    aHero.mJumpTime = 0;
                } else {
                    if (aHero.mHoldSpace > 1 && aHero.mHoldSpace < 10)
                        aHero.mHoldSpace = 1;
                }
            }
        }
        if ((status & 8) && !(status & 4)) {
            if (hPos[1] - dh - dv[1] >= pBox.maxY() - 0.0001) {
                hPos[1] = pBox.maxY() + dh;
                aHero.mVP.cleanYV();
                if (!isMirror) {
                    aHero.mInAir = false;
                    aHero.mJumpTime = 0;
                } else {
                    if (aHero.mHoldSpace > 1 && aHero.mHoldSpace < 10)
                        aHero.mHoldSpace = 1;
                }
            }
        }
    }
};
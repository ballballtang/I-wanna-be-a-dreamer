/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function SecondTrap(TrapArea, Hero,MirrorHero, Platforms, Stabs, BrokenPlat,noCols) {
    this.mTrap = TrapArea;
    this.mHero = Hero;
    this.mMirrorHero = MirrorHero;
    this.mPlatforms = Platforms;
    this.mStabs = Stabs;
    this.mNoCols = noCols;
    this.mBrokenPlat = BrokenPlat;
    this.mBp = 0;
    this.mButtonCount = 0;
    this.mWhere = -1;
    this.mTime = false;
    this.mTimer = 0;
    this.mPaperTime = false;
    this.mPaperTimer = 0;//计时纸条出现的时间
}

SecondTrap.prototype.isTrigger = function () {
    var num = this.mTrap.size();
    var i;

    for (i = 0; i < num; i++) {
        var tt = this.mTrap.getObjectAt(i);
        var hBox = this.mHero.getBBox();
        var mhBox = this.mMirrorHero.getBBox();
        var tBox = tt.getBBox();
        var status1 = hBox.boundCollideStatus(tBox);
        var status2 = mhBox.boundCollideStatus(tBox);
        var status = status1 || status2;
        //console.log(status1);
        if (status) {
            this.mWhere = i;
        }
    }

};

SecondTrap.prototype.trapProcess = function (num) {
    switch (num)
    {
        case 0:
            if (this.mNoCols[1]) {
                if (this.mPaperTimer < 200) {
                    this.mNoCols[1].setVisibility(true); //两秒后不会再setvisible了
                }
                this.mPlatforms.getObjectAt(22).setVisibility(false);
                this.mPaperTime = true;
            }
            if(this.mBp === 0){
                this.mBrokenPlat.getObjectAt(3).setVisibility(true);
                this.mBp +=1;
            }
            
            break;
        case 1:
            this.mNoCols[0].push();
            this.mHero.setMirror(-1);
            this.mMirrorHero.setMirror(1);
            break;
        case 2:
            this.mStabs.getObjectAt(4).moveRight(200);
            break;
        case 3:
            this.mPlatforms.getObjectAt(19).setVisibility(false);
            this.mButtonCount += 1;
            break;
        case 4:
            this.mPlatforms.getObjectAt(20).setVisibility(false);
            this.mButtonCount += 1;
            break;
        case 5:
            this.mStabs.getObjectAt(7).moveUp(300);
            break;
        case 6:
            this.mStabs.getObjectAt(0).setVisibility(true);
            break;
        default:
            return;
    }
};

SecondTrap.prototype.update = function () {
    this.mWhere = -1;
    this.isTrigger();
    
    console.log(this.mWhere);
//    if (this.mNoCols[1].isVisible()) {
//        if (this.mHero.pixelTouches(this.mNoCols[1], [])) {
//            this.mNoCols[1].setVisibility(false);
//        }
//    }

    if (this.mWhere !== -1) {
        this.trapProcess(this.mWhere);
    }
    if (this.mWhere === 1) {
        this.mTime = true;
    }
    if (this.mTime === true) {
        this.mTimer += 1;
    }
    console.log("mTimer: "+this.mTimer);
    if (this.mTimer === 80) {
        this.mPlatforms.getObjectAt(18).setVisibility(true);
    }
    if (this.mPaperTime === true) {
        this.mPaperTimer += 1;
        //console.log(this.mPaperTimer);
    }
    if (this.mNoCols[1] && this.mPaperTimer === 200) {
        this.mNoCols[1].setVisibility(false);
        this.mPaperTime = false;
    }
    
    if(this.mButtonCount >= 2){
        //console.log(this.mButtonCount);
        this.mPlatforms.getObjectAt(11).setVisibility(false);
        this.mPlatforms.getObjectAt(13).setVisibility(false);
        this.mHero.setVisibility(false);
    }

};

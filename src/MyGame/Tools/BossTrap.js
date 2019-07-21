/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine */

function BossTrap(TrapArea, Hero, Platforms, Stabs, Sentence, Boss, Seed, noCols) {
    this.mTrap = TrapArea;
    this.mHero = Hero;
    this.mPlatforms = Platforms;
    this.mNoCols = noCols;
    this.mStabs = Stabs;
    this.mWhere = -1;
    this.mWalk = false;
    this.mHasShownPaper = false;
    this.mEnterCount = 0;
    this.mSenSet = Sentence; //台词集合
    this.mSenStart = false;
    
    this.mBoss = Boss;
    this.mSeed = Seed;

}

BossTrap.prototype.isTrigger = function () {
    var num = this.mTrap.size();
    var i;

    for (i = 0; i < num; i++) {
        var tt = this.mTrap.getObjectAt(i);
        var hBox = this.mHero.getBBox();
        var tBox = tt.getBBox();
        var status = hBox.boundCollideStatus(tBox);
        if (status) {
            this.mWhere = i;

            console.log(this.mHero.getControl());
        }
    }

};

BossTrap.prototype.trapProcess = function (num) {
    switch (num)
    {
        case 0:
            if (this.mNoCols[0] && !this.mHasShownPaper) {
                this.mNoCols[0].setVisibility(true); 
                this.mPlatforms.getObjectAt(7).setVisibility(false);
            }
            this.mHero.setControl(false);
            this.mHero.mVP.setXV(0);
            this.mHasShownPaper = true;
        default:
            return;
    }
};
BossTrap.prototype.sentenceProcess = function(){
    var num = this.mSenSet.size();
    var i;
    for(i=0;i<num;i++){
        this.mSenSet.getObjectAt(i).setVisibility(false);
    }
    if(this.mEnterCount>=0 && this.mEnterCount < num){
        console.log(this.mEnterCount);
        this.mSenSet.getObjectAt(this.mEnterCount).setVisibility(true);
    }
};

BossTrap.prototype.update = function () {
    this.mWhere = -1;
    this.isTrigger();
    console.log(this.mWhere);
    if (this.mWhere !== -1) {
        this.trapProcess(this.mWhere);
    }

    if (this.mNoCols[0] && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        this.mNoCols[0].setVisibility(false);
        this.mWalk = true;
        
    }
    if(!this.mHero.getControl() && this.mWalk){
        this.mHero.mVP.setXV(90);
        if(this.mHero.getXform().getXPos()>300){
            this.mHero.mVP.setXV(0);
            //this.mEnterCount +=1;
            this.mSenStart = true;
        }
    }
    if(this.mSenStart && gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
      
        this.mEnterCount +=1;
    }
    if(this.mEnterCount === 1){
        this.mBoss.setVisibility(true);
        this.mSeed.setVisibility(false);
    }//当主角台词说完后boss出现，种子消失
    if(this.mEnterCount === 9){
        this.mBoss.setMove(true);
    }//当boss台词说完后，开始移动
    if(this.mSenStart){
        this.sentenceProcess();
    }
    

};

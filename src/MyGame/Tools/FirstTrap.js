/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function FirstTrap(TrapArea,Hero,Platforms,Stabs,noCols){
    this.mTrap = TrapArea;
    this.mHero = Hero;
    this.mPlatforms = Platforms;
    this.mStabs = Stabs;
    this.mNoCols = noCols;
    this.mWhere = -1;
    this.mTime = false;
    this.mTimer = 0;
    this.mPaperTime = false;
    this.mPaperTimer = 0;//计时纸条出现的时间
}

FirstTrap.prototype.isTrigger = function(){
    var num = this.mTrap.size();
    var i;
    
    for(i=0;i<num;i++){
        var tt = this.mTrap.getObjectAt(i);
        var hBox = this.mHero.getBBox();
        var tBox = tt.getBBox();
        var status = hBox.boundCollideStatus(tBox);
        if(status){
            this.mWhere = i;
        }
    }

};

FirstTrap.prototype.trapProcess = function(num){
    switch (num)
    {
        case 0:
            this.mPlatforms.getObjectAt(8).moveDown(100);
            break;
        case 1:
            this.mPlatforms.getObjectAt(5).disappear();
            this.mNoCols[0].push();
            break;
        case 2:
            this.mStabs.getObjectAt(2).setVisibility(true);
            break;
        case 3:
            this.mStabs.getObjectAt(1).setVisibility(true);
            break;
        case 4:
            this.mStabs.getObjectAt(3).getObjectAt(4).moveDown(300);
            break;
        case 5:
            this.mStabs.getObjectAt(7).moveLeft(200);
            break;
        case 6:
            if(this.mPaperTimer < 200){
                this.mPlatforms.getObjectAt(14).setVisibility(true); //两秒后不会再setvisible了
            }            
            this.mPlatforms.getObjectAt(13).setVisibility(false);
            this.mPaperTime = true;
            break;
        default:
            return;
    }
};

FirstTrap.prototype.update = function(){
    this.mWhere = -1;
    this.isTrigger();
    //console.log(this.mWhere);
    if(this.mHero.pixelTouches(this.mNoCols[1], [])) {
        this.mNoCols[1].setVisibility(false);
    }
    
    if(this.mWhere !== -1){
        this.trapProcess(this.mWhere);
    }
    if(this.mWhere === 1){
        this.mTime = true;
    }
    if(this.mTime === true){
        this.mTimer +=1;
    }
    if(this.mTimer === 80){
        this.mStabs.getObjectAt(4).setVisibility(true);
    }
    if(this.mPaperTime === true){
        this.mPaperTimer +=1;
        console.log(this.mPaperTimer);
    }
    if(this.mPaperTimer === 200){
        this.mPlatforms.getObjectAt(14).setVisibility(false);
        this.mPaperTime = false;
    }
    
};

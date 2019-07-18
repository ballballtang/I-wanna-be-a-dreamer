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


function BossTrap(TrapArea,Hero,Platforms,Stabs){
    this.mTrap = TrapArea;
    this.mHero = Hero;
    this.mPlatforms = Platforms;
    this.mStabs = Stabs;
    this.mWhere = -1;

    this.mPaperTime = false;
    this.mPaperTimer = 0;//计时纸条出现的时间
}

BossTrap.prototype.isTrigger = function(){
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

BossTrap.prototype.trapProcess = function(num){
    switch (num)
    {
        case 0:
            if(this.mPaperTimer < 200){
                this.mPlatforms.getObjectAt(4).setVisibility(true); //两秒后不会再setvisible了
            }            
            this.mPlatforms.getObjectAt(3).setVisibility(false);
            this.mPaperTime = true;
            break;
        default:
            return;
    }
};

BossTrap.prototype.update = function(){
    this.mWhere = -1;
    this.isTrigger();
    console.log(this.mWhere);
    if(this.mWhere !== -1){
        this.trapProcess(this.mWhere);
    }

    if(this.mPaperTime === true){
        this.mPaperTimer +=1;
        console.log(this.mPaperTimer);
    }
    if(this.mPaperTimer === 200){
        this.mPlatforms.getObjectAt(4).setVisibility(false);
        this.mPaperTime = false;
    }
    
};

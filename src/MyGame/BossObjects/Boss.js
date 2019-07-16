/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */

function Boss(texture,atX,atY,w,h){
    this.mBoss = new TextureRenderable(texture);
    this.mBoss.setColor([1,1,1,0]);
    this.mBoss.getXform().setPosition(atX,atY);
    this.mBoss.getXform().setSize(w,h);
    GameObject.call(this,this.mBoss);
    this.mBlood = 100;
    this.mDeath = false;
    this.mdelta = 0.2;//moving distance
    var dustParams = new DustParams(false,50,40,50,-2.5,200,0,0,1,1,0,1,40);
    this.mDust = new Dust(dustParams);
    this.mXParticles = new ParticleGameObjectSet();
    this.mUIbar = new UIBar([400,500],[800,20]);
    this.mUIbar.setVisible(false);
    this.setVisibility(false);

}
gEngine.Core.inheritPrototype(Boss,GameObject);

Boss.prototype.DecBlood = function(){
    if(this.mBlood === 0){
        this.mDeath = true;
        return;
    }//to check the death
    this.mBlood = this.mBlood-1;
};

Boss.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this,aCamera);
    this.mDust.draw(aCamera);
    this.mXParticles.draw(aCamera);
    this.mUIbar.draw(aCamera);
};

Boss.prototype.update = function(visible){
    //this.setVisibility(visible);
    //this.mUIbar.setBGVisible(visible);
    //this.mUIbar.setMidVisible(visible);
    //all the KeyClicked event is used for testing
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.J)){
        this.setVisibility(true);
        this.mUIbar.setVisible(true);
    }
    if(this.mDeath || gEngine.Input.isKeyClicked(gEngine.Input.keys.F)){
        this.setVisibility(false);
        this.mUIbar.setVisible(false);
        this.mDust.startLife();
    }
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.K)){
        this.DecBlood();
        
    }
    //control the moving
    var xf = this.getXform();
    xf.incYPosBy(this.mdelta);
    if(xf.getYPos()<=5){
        this.mdelta = -1*this.mdelta;
    }
    if(xf.getYPos()>=60){
        this.mdelta = -1*this.mdelta;
    }
    this.mUIbar.setCurrentValue(this.mBlood);
    this.mUIbar.update();
    //update the particleSystem
    gEngine.ParticleSystem.update(this.mDust);
    gEngine.ParticleSystem.update(this.mXParticles);
    GameObject.prototype.update.call(this);
};




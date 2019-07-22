/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */

function Boss(texture, atX, atY, w, h) {
    this.mBoss = new SpriteRenderable(texture);
    this.mBoss.setColor([1, 1, 1, 0]);
    this.mBoss.getXform().setPosition(atX, atY);
    this.mBoss.getXform().setSize(w, h);
    this.mBoss.setElementPixelPositions(0, 844, 0, 512);
    GameObject.call(this, this.mBoss);
    
    this.mBlood = 82;
    this.mDeath = false;
    
    var dustParams = new DustParams(false, 0, 280, 600, -20, 500, 0, 0, 1, 2, 0, 10, 100);
    this.mDust = new Dust(dustParams);
    this.mParticleNum = -1;
    
    this.mUIbar = new UIBar([600, 615], [1100, 25]);
    this.mUIbar.setMaxValue(this.mBlood);
    this.mUIbar.setVisible(false);
    this.setVisibility(false);
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.DecBlood = function () {
    if (this.mBlood <= 5) {
        this.mDeath = true;
        return;
    }//to check the death
    this.mBlood = this.mBlood - 5;
};

Boss.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mDust.draw(aCamera);
    this.mUIbar.draw(aCamera);
};

Boss.prototype.update = function () {
    /*if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        this.setVisibility(true);
        this.mUIbar.setVisible(true);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.K)) {
        this.DecBlood();
    }*/
    
    
    if (this.mParticleNum > 1000) {
        this.mDust.endLife();
    }
    if (this.mParticleNum >= 0 && this.mParticleNum <= 1500)
        this.mParticleNum += 1;

    if (this.mDeath && this.mParticleNum < 0) {
        this.setVisibility(false);
        this.mUIbar.setVisible(false);
        this.mDust.startLife();
        this.mParticleNum = 0;
    }

    this.mUIbar.setCurrentValue(this.mBlood);
    this.mUIbar.update();
    
    gEngine.ParticleSystem.update(this.mDust);
};




/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, Scene, vec2 */

function StartScene(){
    this.kBeginning = new Array();
    var i;
    for(i=0;i<317;i++){
        if(i<10){
            this.kBeginning[i]="assets/Beginning/beginning000"+i+".png";
        }else if(i<100){
            this.kBeginning[i]="assets/Beginning/beginning00"+i+".png";
        }else{
            this.kBeginning[i]="assets/Beginning/beginning0"+i+".png";
        }
        
    }
    this.mBg = null;
    this.mBgCount = 0;
    this.mBgStart = false;
    this.mTimer = 0;
    this.mCamera = null;
    this.LevelSelect = null;
    //console.log(this.kBeginning[100]);
    
}
gEngine.Core.inheritPrototype(StartScene,Scene);

StartScene.prototype.loadScene = function(){
    var i;
    for(i=0;i<317;i++){
        gEngine.Textures.loadTexture(this.kBeginning[i]);
    }
};

StartScene.prototype.unloadScene = function(){
    var i;
    for(i=0;i<317;i++){
        gEngine.Textures.unloadTexture(this.kBeginning[i]);
    }
    gEngine.Core.changeScene(new FirstLevel(),true);
};

StartScene.prototype.initialize = function(){
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    this.mBg = new Platform(this.kBeginning[this.mBgCount], 0, 0, 1200, 675); //.setTexture
};

StartScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mBg.draw(this.mCamera);
};

StartScene.prototype.update = function(){
    this.mTimer += 1;
    if(this.mTimer === 11 && this.mBgCount<267){
        this.mBgCount += 1;
        this.mBg.mPlatform.setTexture(this.kBeginning[this.mBgCount]);
        this.mTimer = 0;
    }
    if(this.mBgCount === 267){
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
            this.mBgStart = true;
            this.mTimer = 0; 
        }
    }
    if(this.mBgStart){
        if(this.mTimer === 12){
            this.mBgCount += 1;
            this.mBg.mPlatform.setTexture(this.kBeginning[this.mBgCount]);
            this.mTimer = 0;
        }
    }
    this.mBg.update();
    console.log(this.mBgCount);
    if(this.mBgCount === 316){
        gEngine.GameLoop.stop();
    }
};
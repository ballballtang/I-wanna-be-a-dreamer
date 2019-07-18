/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, vec2, Scene */

function StartScene() {
    //this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kBg = "assets/title_2.png";
    this.mCamera = null;
    this.mBg = null;

    this.UIButton = null;

    this.LevelSelect = null;
}
gEngine.Core.inheritPrototype(StartScene, Scene);


StartScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBg);
};

StartScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBg);
    if(this.LevelSelect==="StartGame"){
        gEngine.Core.changeScene(new MyGame(),true);
    }

};

StartScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    this.mBg = new Platform(this.kBg,0,0,1200,675);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    

    this.UIButton =  new UIButton(this.startGameSelect,this,[260,280],[200,60],"Start Game",24);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
StartScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();

    this.UIButton.draw(this.mCamera);
    this.mBg.draw(this.mCamera);

};

StartScene.prototype.update = function () {
    this.UIButton.update();
};

StartScene.prototype.startGameSelect= function(){
    this.LevelSelect="StartGame";
    gEngine.GameLoop.stop();
};


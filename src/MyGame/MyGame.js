/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, vec2, Scene */

function MyGame() {
    //this.kUIButton = "assets/UI/button.png";
    this.kUIButton = "assets/UI/SimpleButton.png";
    this.kBg = "assets/title.png";
    
    this.kBgClip = "assets/MEGALOVANIA.mp3";
    this.kBeginning = [];
    for (var i = 0; i < 317; i++) {
        if (i < 10) {
            this.kBeginning[i] = "assets/Beginning/beginning000" + i + ".png";
        } else if (i < 100) {
            this.kBeginning[i] = "assets/Beginning/beginning00" + i + ".png";
        } else {
            this.kBeginning[i] = "assets/Beginning/beginning0" + i + ".png";
        }
    }

    this.mCamera = null;
    this.LevelSelect = null;

    this.mBg = null;
    this.UIButton = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kBg);
    for (var i = 0; i < 317; i++) {
        gEngine.Textures.loadTexture(this.kBeginning[i]);
    }

    if (!(gEngine.ResourceMap.isAssetLoaded(this.kBgClip)))
        gEngine.AudioClips.loadAudio(this.kBgClip);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kBg);

    if (this.LevelSelect === "StartGame") {
        gEngine.Core.changeScene(new StartScene(), true);
    }
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray
    this.mBg = new Platform(this.kBg, 0, 0, 1200, 675);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    this.UIButton = new UIButton(this.startGameSelect, this, [260, 280], [200, 60], "Start Game", 24);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.UIButton.draw(this.mCamera);
    this.mBg.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.UIButton.update();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        this.startGameSelect();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        this.LevelSelect = "StartScene";
        gEngine.GameLoop.stop();
    }
};

MyGame.prototype.startGameSelect = function () {
    this.LevelSelect = "StartGame";
    console.log(this.LevelSelect);
    gEngine.GameLoop.stop();
};


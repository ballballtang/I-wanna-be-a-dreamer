/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Scene, gEngine */

function BossLevel() {
    this.kTestTexture = "assets/JustForTest.png";
    this.kWood = "assets/RigidShape/Wood.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;

    // Objects
    //this.mHero = null;
    this.mBoss = null;
    this.mPlatSet = new GameObjectSet();

    //Tools
    //this.mSolveCol = null;
}
gEngine.Core.inheritPrototype(BossLevel, Scene);

BossLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kWood);

};

BossLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Core.startScene(new MyGame());

};

BossLevel.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    //this.mHero = new Hero(this.kTestTexture, 1);
    //this.mMirrorHero = new Hero(this.kTestTexture, -1);
    this.mBoss = new Boss(this.kTestTexture, 530, 266, 80, 80);
    
    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -600, -76.25, 60, 780));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 600, 0, 60, 675));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -300, -337.5, 1800, 60));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 0, 337.5, 1200, 60));

    //platforms
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 65, -200, 270, 30));
    this.mPlatSet.addToSet(new MovePlatform(this.kWood, -350, -100, 280, 30, -400, -200));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -140, 50, 300, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -300, 200, 240, 30));
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    //this.mHero.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    this.mBoss.draw(this.mCamera);
};

BossLevel.prototype.update = function () {
    this.mBoss.update(true);
    //this.mHero.update();
    this.mPlatSet.update();
    this.mCamera.update();
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        console.log("shaking");
        this.mCamera.shake(80, 80, 20, 30);
    }
    
    //this.mSolveCol.update();
};
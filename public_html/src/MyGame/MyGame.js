/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kTestTexture = "assets/JustForTest.png";
    this.kStabTexture = "assets/TestStab.png";
    this.kWood = "assets/RigidShape/Wood.png";
    this.kIce = "assets/RigidShape/Ice.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;
    
    // Objects
    this.mHero = null;
    this.mMirrorHero = null;
    this.mPlatSet = new GameObjectSet();
    this.mStabSetSet = new GameObjectSet();
    
    //Tools
    this.mSolveCol = null;
    this.mTips = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kStabTexture);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kIce);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kStabTexture);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kIce);

    //if (this.LevelSelect === "") {
        gEngine.Core.startScene(new BossLevel());
    //}
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mHero = new Hero(this.kTestTexture, 1);
    this.mMirrorHero = new Hero(this.kTestTexture, -1);
    
    //bounds
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, -600, -76.25, 60, 580) );
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, 600, 0, 60, 675) );
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, -300, -337.5, 600, 60) );
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, 0, 337.5, 1200, 60) );
    
    //platforms
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, 65, -180, 270, 30) );
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, 390, -240, 150, 30) );
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, 455, 60, 140, 30) );
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, 100, 200, 130, 30) );
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, -140, 140, 180, 30) );
    this.mPlatSet.addToSet( new NormalPlatform(this.kWood, -480, 200, 240, 30) );
    
    //stabs
    this.mStabSetSet.addToSet( new StabSet(this.kStabTexture, 4, -350, -307.5) );
    this.mStabSetSet.addToSet( new StabSet(this.kStabTexture, 1, 50, -165) );
    
    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, this.mMirrorHero, this.mPlatSet.mSet);
    this.mTips = new Sentence(this.kIce);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mStabSetSet.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mMirrorHero.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    
    this.mTips.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.mHero.update();
    this.mMirrorHero.update();
    this.mPlatSet.update();
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.M)){
        gEngine.GameLoop.stop();
    }
    this.mSolveCol.update();
    this.mTips.update(this.mHero.getXform());
};
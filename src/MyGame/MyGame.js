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

function MyGame(aHero) {
    this.kTestTexture = "assets/JustForTest.png";
    this.kStabTexture = "assets/TestStab.png";
    this.kYouDied = "assets/YouDied.png";
    this.kWood = "assets/RigidShape/Wood.png";
    this.kIce = "assets/RigidShape/Ice.png";
    this.kDirt = "assets/RigidShape/Dirt.png";

    this.kBgClip = "assets/MEGALOVANIA.mp3";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;

    // Objects
    this.mHero = aHero ? aHero : null;
    this.mMirrorHero = null;
    this.mPlatSet = new GameObjectSet();
    this.mBrokeSet = new GameObjectSet();
    this.mStabSetSet = new GameObjectSet();

    //Tools
    this.mSolveCol = null;
    this.mTips = null;
    this.mShowDeath = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kStabTexture);
    gEngine.Textures.loadTexture(this.kYouDied);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kIce);
    gEngine.Textures.loadTexture(this.kDirt);

    if (!(gEngine.ResourceMap.isAssetLoaded(this.kBgClip)))
        gEngine.AudioClips.loadAudio(this.kBgClip);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kStabTexture);
    gEngine.Textures.unloadTexture(this.kYouDied);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kIce);
    gEngine.Textures.unloadTexture(this.kDirt);

    if (this.LevelSelect === "restart") {
        gEngine.Core.changeScene(new MyGame(), true);
    }
    if (this.LevelSelect === "boss") {
        gEngine.Core.changeScene(new BossLevel(this.mHero), false);
    }
    if (this.LevelSelect === "second") {
        //console.log("-------");
        gEngine.Core.changeScene(new SecondLevel(this.mHero), false);
    }
    if (this.LevelSelect === "SecondLevel") {
        gEngine.Core.startScene(new SecondLevel());
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
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    if (this.mHero === null)
        this.mHero = new Hero(this.kTestTexture, -500, -200, 1);
    else
        this.mHero.cleanStatus(this.mCamera);
    //this.mMirrorHero = new Hero(this.kTestTexture, 500, 200, -1);

    //bounds
    //this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -600, -76.25, 60, 580));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 600, 0, 60, 675));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -300, -337.5, 600, 60));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 0, 337.5, 1400, 60));

    //platforms
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 65, -180, 270, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 390, -240, 150, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 455, 60, 140, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 100, 200, 130, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -140, 140, 180, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -500, 200, 280, 30));

    //broken platforms
    this.mBrokeSet.addToSet(new BrokenPlatform(this.kDirt, -375, 261.25, 30, 92.5));

    //stabs
    this.mStabSetSet.addToSet(new StabSet(this.kStabTexture, 4, -350, -307.5, false, false));
    this.mStabSetSet.addToSet(new StabSet(this.kStabTexture, 1, 50, -165, false, false));

    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, this.mMirrorHero, this.mPlatSet.mSet, this.mBrokeSet.mSet, this.mStabSetSet.mSet);
    this.mTips = new Sentence(this.kIce);
    this.mShowDeath = new Platform(this.kYouDied, 0, 0, 450, 450);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mStabSetSet.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    //this.mMirrorHero.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    this.mBrokeSet.draw(this.mCamera);

    this.mTips.draw(this.mCamera);

    if (this.mHero.mIsDead)
        this.mShowDeath.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.LevelSelect = "restart";
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if (!gEngine.AudioClips.isBackgroundAudioPlaying())
            gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    }
//    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
//        this.LevelSelect = "boss";
//        gEngine.GameLoop.stop();
//    }

    if (this.mHero.mIsGoingLeft) {
        this.LevelSelect = "second";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsDead) {
        return;
    }

    this.mStabSetSet.update();
    this.mHero.update();
    //this.mMirrorHero.update();
    this.mPlatSet.update();
    this.mBrokeSet.update();

    this.mTips.update(this.mHero.getXform());
    this.mSolveCol.update();
};
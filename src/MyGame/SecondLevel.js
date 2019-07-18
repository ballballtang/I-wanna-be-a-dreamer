/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, vec2, Scene */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SecondLevel(aHero) {
    this.kTestTexture = "assets/JustForTest.png";
    this.kStabTexture = "assets/TestStab.png";
    this.kYouDied = "assets/YouDied.png";
    this.kWood = "assets/RigidShape/Wood.png";
    this.kIce = "assets/RigidShape/Ice.png";
    this.kDirt = "assets/RigidShape/Dirt.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;

    // Objects
    this.mHero = aHero ? aHero : null;
    this.mPlatSet = new GameObjectSet();
    this.mBrokeSet = new GameObjectSet();
    this.mStabSetSet = new GameObjectSet();

    //Tools
    this.mSolveCol = null;
    this.mShowDeath = null;
}
gEngine.Core.inheritPrototype(SecondLevel, Scene);

SecondLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kStabTexture);
    gEngine.Textures.loadTexture(this.kYouDied);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kIce);
    gEngine.Textures.loadTexture(this.kDirt);
};

SecondLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kStabTexture);
    gEngine.Textures.unloadTexture(this.kYouDied);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kIce);
    gEngine.Textures.unloadTexture(this.kDirt);

    if (this.LevelSelect === "restart") {
        gEngine.Core.changeScene(new SecondLevel(), true);
    }
    if (this.LevelSelect === "boss") {
        gEngine.Core.changeScene(new BossLevel(this.mHero), false);
    }
    if (this.LevelSelect === "FirstLevel") {
        gEngine.Core.changeScene(new MyGame(this.mHero), false);
    }
};

SecondLevel.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(0, 0), // position of the camera
            1200, // width of camera
            [0, 0, 1200, 675]         // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);

    if (this.mHero === null)
        this.mHero = new Hero(this.kTestTexture, 522, 234.4, 1);
    else
        this.mHero.cleanStatus(this.mCamera);
    this.mMirrorHero = new Hero(this.kTestTexture, 500, 200, -1);

    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -500, 108, 270, 130));//左边的胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 589, 70, 250, 290));//右边的大平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -500, -300, 270, 70));//左下角的矮胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 0, 337.5, 1400, 60));//最上面的边界

    //platforms
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 550, -300, 270, 70));//右下角的矮胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 430, -172, 30, 186));//右下角的矮胖平台上的瘦高平台（触发按钮后消失）
    this.mPlatSet.addToSet(new MovePlatform(this.kWood, 100, -240, 150, 30,-250,300));//会动的平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 135, -65, 1000, 30));//右边平台伸出来的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 260, 150, 130, 30));//大平台旁边第一个消失的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 0, 150, 130, 30));//大平台旁边第二个看上去不正常其实可以踩的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -230, 40, 80, 180));//第三个竖着的长方形平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -580, 240, 60, 135));//左上角竖着的平台

    //broken platforms
    this.mBrokeSet.addToSet(new BrokenPlatform(this.kDirt, -380, -18, 30, 124));

    //stabs
    this.mStabSetSet.addToSet(new StabSet(this.kStabTexture, 14, -185, -50));
    this.mStabSetSet.addToSet(new StabSet(this.kStabTexture, 1, -410, -265));

    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, null,this.mPlatSet.mSet, this.mBrokeSet.mSet, this.mStabSetSet.mSet);
    this.mShowDeath = new Platform(this.kYouDied, 0, 0, 450, 450);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SecondLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mStabSetSet.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    this.mBrokeSet.draw(this.mCamera);

    if (this.mHero.mIsDead)
        this.mShowDeath.draw(this.mCamera);
};

SecondLevel.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.LevelSelect = "restart";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsGoingLeft) {
        this.LevelSelect = "boss";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsGoingRight) {
        this.LevelSelect = "FirstLevel";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsDead)
        return;

    this.mStabSetSet.update();
    this.mHero.update();
    this.mPlatSet.update();
    this.mBrokeSet.update();
    //console.log(this.mHero.getXform().getPosition());
    this.mSolveCol.update();
};



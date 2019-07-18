/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Scene, gEngine */

function BossLevel(aHero) {
    this.kTestTexture = "assets/TestTexture.png";
    this.kSceneObj = "assets/SceneObjects.png";
    this.kPlatTexture = "assets/platform.png";
    this.kBrokenTexture = "assets/broken.png";
    this.kYouDied = "assets/YouDied.png";
    this.kBullet = "assets/bullet.png";
    this.kHero = "assets/EmptyAction.png";
    //this.kWood = "assets/RigidShape/Wood.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;

    // Objects
    this.mHero = aHero ? aHero : null;
    this.mBoss = null;
    this.mPlatSet = new GameObjectSet();

    //Tools
    this.mSolveCol = null;
    this.mShowDeath = null;
}
gEngine.Core.inheritPrototype(BossLevel, Scene);

BossLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kSceneObj);
    gEngine.Textures.loadTexture(this.kPlatTexture);
    gEngine.Textures.loadTexture(this.kBrokenTexture);
    gEngine.Textures.loadTexture(this.kYouDied);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kHero);
    //gEngine.Textures.loadTexture(this.kWood);
};

BossLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kSceneObj);
    gEngine.Textures.unloadTexture(this.kPlatTexture);
    gEngine.Textures.unloadTexture(this.kBrokenTexture);
    gEngine.Textures.unloadTexture(this.kYouDied);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kHero);
    //gEngine.Textures.unloadTexture(this.kWood);

    if (this.LevelSelect === "restart") {
        gEngine.Core.changeScene(new BossLevel(), true);
    }
    if (this.LevelSelect === "SecondLevel") {
        gEngine.Core.changeScene(new SecondLevel(this.mHero), false);
    }
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

    if (this.mHero === null)
        this.mHero = new Hero(this.kHero, this.kBullet, 0, 0, 1);
    else
        this.mHero.cleanStatus(this.mCamera);
    this.mBoss = new Boss(this.kTestTexture, 530, 266, 80, 80);

    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -600, -76.25, 60, 780));
    //this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 600, 0, 60, 675));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -300, -337.5, 1800, 60));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 337.5, 1400, 60));

    //platforms
    //this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 65, -280, 270, 60));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 65, -200, 270, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -350, -100, 280, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -140, 50, 300, 30));
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -300, 200, 240, 30));

    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, null, this.mPlatSet.mSet, [], []);
    this.mShowDeath = new Platform(this.kYouDied, 0, 0, 450, 450);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mPlatSet.draw(this.mCamera);
    this.mBoss.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    //this.mHero.drawBBox(this.mCamera);

    if (this.mHero.mIsDead)
        this.mShowDeath.draw(this.mCamera);
};

BossLevel.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.LevelSelect = "restart";
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        //console.log("shaking");
        this.mCamera.shake(80, 80, 20, 30);
    }

    if (this.mHero.mIsGoingRight) {
        this.LevelSelect = "SecondLevel";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsDead) {
        return;
    }

    this.mBoss.update(true);
    this.mHero.update();
    this.mPlatSet.update();
    this.mCamera.update();

    this.mSolveCol.update();
};
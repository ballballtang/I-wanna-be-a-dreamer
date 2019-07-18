/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global Scene, gEngine */

function BossLevel(aHero) {
    this.kTestTexture = "assets/TestTexture.png";
    this.kWood = "assets/platform.png";
    //the hint
    this.kPaper = "assets/clue_s.png";
    this.kContent = "assets/clue_b2.png";
    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;

    // Objects
    this.mHero = aHero;
    this.mBoss = null;
    this.mPlatSet = new GameObjectSet();

    //Trap
    this.mTraps = new GameObjectSet();
    this.mTrapP = null;
    //Tools
    this.mSolveCol = null;
}
gEngine.Core.inheritPrototype(BossLevel, Scene);

BossLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kPaper);
    gEngine.Textures.loadTexture(this.kContent);

};

BossLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kPaper);
    gEngine.Textures.unloadTexture(this.kContent);
    gEngine.Core.changeScene(new SecondLevel(this.mHero), false);
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
        this.mHero = new Hero(this.kTestTexture, 1);
    else
        this.mHero.cleanStatus(this.mCamera);
    //this.mMirrorHero = new Hero(this.kTestTexture, -1);
    this.mBoss = new Boss(this.kTestTexture, 530, 266, 80, 80);

    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -600, -76.25, 60, 780));
    //this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 600, 0, 60, 675));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -300, -337.5, 1800, 60));
    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 0, 337.5, 1400, 60));

    //platforms
//    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, 65, -200, 270, 30));
//    this.mPlatSet.addToSet(new MovePlatform(this.kWood, -350, -100, 280, 30, -400, -200));
//    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -140, 50, 300, 30));
//    this.mPlatSet.addToSet(new NormalPlatform(this.kWood, -300, 200, 240, 30));
    this.mPlatSet.addToSet(new Platform(this.kPaper,520,-290,30,30)); //纸团 7,3
    this.mPlatSet.addToSet(new Platform(this.kContent,0,0,500,500));//纸团内容 8,4
    this.mPlatSet.getObjectAt(4).setVisibility(false);
    
    this.mTraps.addToSet(new NormalPlatform(this.kPaper,520,-290,40,40));//打开纸团
    var ss = this.mTraps.size();
    var i;
    for(i=0;i<ss;i++){
        this.mTraps.getObjectAt(i).setVisibility(false);
    }
    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, null, this.mPlatSet.mSet, [], []);
    this.mTrapP = new BossTrap(this.mTraps,this.mHero,this.mPlatSet,null);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BossLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mHero.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    this.mBoss.draw(this.mCamera);
};

BossLevel.prototype.update = function () {
    if (this.mHero.mIsGoingRight) {
        gEngine.GameLoop.stop();
    }
    
    this.mTrapP.update();
    this.mBoss.update(true);
    this.mHero.update();
    this.mPlatSet.update();
    this.mCamera.update();

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.M)) {
        gEngine.GameLoop.stop();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {
        //console.log("shaking");
        this.mCamera.shake(80, 80, 20, 30);
    }

    this.mSolveCol.update();
};
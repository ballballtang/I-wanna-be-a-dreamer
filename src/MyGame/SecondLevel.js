/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, vec2, Scene */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SecondLevel(aHero) {
    this.kTestTexture = "assets/TestTexture.png";
    this.kSceneObj = "assets/SceneObjects.png";
    this.kPlatTexture = "assets/platform.png";
    this.kBrokenTexture = "assets/broken.png";
    this.kMoveTexture = "assets/moving.png";
    this.kYouDied = "assets/YouDied.png";
    this.kBullet = "assets/bullet.png";
    this.kHero = "assets/EmptyAction.png";
    //the hint
    this.kPaper = "assets/clue_s.png";
    this.kContent = "assets/clue_b1.png";
    //this.kStabTexture = "assets/TestStab.png";
    //this.kWood = "assets/RigidShape/Wood.png";
    this.kIce = "assets/RigidShape/Ice.png";
    //this.kDirt = "assets/RigidShape/Dirt.png";

    // The camera to view the scene
    this.mCamera = null;
    this.LevelSelect = null;

    // Objects
    this.mHero = aHero ? aHero : null;
    //TrapProcess
    this.mTrapP = null;

    this.mPlatSet = new GameObjectSet();
    this.mBrokeSet = new GameObjectSet();
    this.mStabSetSet = new GameObjectSet();
    this.mTrapSet = new GameObjectSet();
    this.mNoCollisionStab = new GameObjectSet(); //不参与碰撞检测的刺
    this.mButton = null;//button
    

    //Tools
    this.mSolveCol = null;
    this.mShowDeath = null;
}
gEngine.Core.inheritPrototype(SecondLevel, Scene);

SecondLevel.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kTestTexture);
    gEngine.Textures.loadTexture(this.kSceneObj);
    gEngine.Textures.loadTexture(this.kPlatTexture);
    gEngine.Textures.loadTexture(this.kBrokenTexture);
    gEngine.Textures.loadTexture(this.kMoveTexture);
    gEngine.Textures.loadTexture(this.kYouDied);
    gEngine.Textures.loadTexture(this.kBullet);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kPaper);
    gEngine.Textures.loadTexture(this.kContent);
    //gEngine.Textures.loadTexture(this.kStabTexture);
    //gEngine.Textures.loadTexture(this.kWood);
    gEngine.Textures.loadTexture(this.kIce);
    //gEngine.Textures.loadTexture(this.kDirt);
};

SecondLevel.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kTestTexture);
    gEngine.Textures.unloadTexture(this.kSceneObj);
    gEngine.Textures.unloadTexture(this.kPlatTexture);
    gEngine.Textures.unloadTexture(this.kBrokenTexture);
    gEngine.Textures.unloadTexture(this.kMoveTexture);
    gEngine.Textures.unloadTexture(this.kYouDied);
    gEngine.Textures.unloadTexture(this.kBullet);
    gEngine.Textures.unloadTexture(this.kHero);
    gEngine.Textures.unloadTexture(this.kPaper);
    gEngine.Textures.unloadTexture(this.kContent);
    //gEngine.Textures.unloadTexture(this.kStabTexture);
    //gEngine.Textures.unloadTexture(this.kWood);
    gEngine.Textures.unloadTexture(this.kIce);
    //gEngine.Textures.unloadTexture(this.kDirt);

    if (this.LevelSelect === "restart") {
        gEngine.Core.changeScene(new SecondLevel(), true);
    }
    if (this.LevelSelect === "BossLevel") {
        gEngine.Core.changeScene(new BossLevel(this.mHero), false);
    }
    if (this.LevelSelect === "FirstLevel") {
        gEngine.Core.changeScene(new FirstLevel(this.mHero), false);
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
        this.mHero = new Hero(this.kHero, this.kBullet, 522, 238.4, 1, true);
    else
        this.mHero.cleanStatus(this.mCamera);

    //bounds
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -500, 110, 270, 126));//左边的胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 589, 70, 250, 290));//右边的大平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -500, -300, 270, 70));//左下角的矮胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 337.5, 1400, 60, true));//最上面的边界

    //platforms
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 550, -300, 270, 70));//右下角的矮胖平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 430, -172, 30, 186, true));//右下角的矮胖平台上的瘦高平台（触发按钮后消失）
    this.mPlatSet.addToSet(new MovePlatform(this.kMoveTexture, 0, -280, 158, 32, -250, 300));//会动的平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 135, -65, 1000, 30));//右边平台伸出来的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 260, 150, 130, 30));//大平台旁边第一个消失的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, 0, 150, 130, 30));//大平台旁边第二个看上去不正常其实可以踩的小平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -230, 40, 50, 180));//第三个竖着的长方形平台
    this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -580, 240, 60, 135, true));//左上角竖着的平台
	//this.mPlatSet.addToSet(new NormalPlatform(this.kPlatTexture, -380, 240, 30, 135, true));//左上角胖平台上长方形障碍物
	//this.mPlatSet.getObjectAt(12).setVisibility(false);
	
    this.mPlatSet.addToSet(new Platform(this.kPaper,480,230,30,30)); //纸团
    this.mPlatSet.addToSet(new Platform(this.kContent,0,0,500,500));//纸团内容 14
    this.mPlatSet.getObjectAt(14).setVisibility(false);

    //broken platforms
    this.mBrokeSet.addToSet(new BrokenPlatform(this.kBrokenTexture, -389, -18, 40, 121));

    //stabs
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 14, -192, -50));//第一层平台上的14个刺
    //this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -463, -265));
    this.mNoCollisionStab.addToSet(new StabSet(this.kSceneObj, 1, -486, -265));//看的见但是是一个假刺,不参与collision处理
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -417, -265));//要设置成看不见
    this.mStabSetSet.getObjectAt(1).setVisibility(false);
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 2, -600, -265)); //要设置成看不见
    this.mStabSetSet.getObjectAt(2).setVisibility(false);
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 14, -228, -80, false, true));//倒着的一排刺，触发trap后第五个刺会掉下来
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 2, -360, 195, true, true));//左上角胖平台上的障碍刺
    this.mStabSetSet.getObjectAt(4).setVisibility(false);

    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -365, 90, true, false));//左上角胖平台侧着的刺
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 1, -255, 60, true, true));//左上角胖平台侧着的刺
    this.mStabSetSet.addToSet(new StabSet(this.kSceneObj, 4, 645, -270, true, true));//右下角触发trap后飞出的一排刺

    this.mSolveCol = new SolveCollision(this.mCamera, this.mHero, null, this.mPlatSet.mSet, this.mBrokeSet.mSet, this.mStabSetSet.mSet);
    this.mShowDeath = new Platform(this.kYouDied, 0, 0, 450, 450);

    //trapArea
    this.mTrapSet.addToSet((new NormalPlatform(this.kIce, 260, 175, 130, 20))); //进入该区域后，this.mPlatSet[8].fall
    this.mTrapSet.addToSet(new NormalPlatform(this.kIce, -520, 240, 60, 60));//第二个trap，碰到按钮之后，按钮改变样子，this.mPlatSet[5]open,this.mPlatSet[12]出现，过几秒后最左边出现一排刺fly out
    this.mTrapSet.addToSet((new NormalPlatform(this.kIce, -554, -219, 100, 92)));//进入该区域，invisible的刺出现
    this.mTrapSet.addToSet((new NormalPlatform(this.kIce, -394, -219, 46, 92)));//进入该区域，invisible的刺出现
    this.mTrapSet.addToSet(new NormalPlatform(this.kIce, -20, -230, 110, 160));//进入该区域，上面有个刺掉下来
	this.mTrapSet.addToSet(new NormalPlatform(this.kIce, 525, -172, 160, 185));//进入该区域，右下角最右边出现一排刺，并且飞出
	this.mTrapSet.addToSet(new NormalPlatform(this.kIce,480,230,40,40));//打开纸团
    var ss = this.mTrapSet.size();
    var i;
    for (i = 0; i < ss; i++) {
        this.mTrapSet.getObjectAt(i).setVisibility(false);
    }
    this.mButton = new Button(this.kSceneObj, -520, 245, 60, 60)//button;
    this.mTrapP = new FirstTrap(this.mTrapSet, this.mHero, this.mPlatSet, this.mStabSetSet, [this.mButton, this.mNoCollisionStab.getObjectAt(0).getObjectAt(0)]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SecondLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();

    this.mStabSetSet.draw(this.mCamera);
    this.mPlatSet.draw(this.mCamera);
    this.mBrokeSet.draw(this.mCamera);
    this.mTrapSet.draw(this.mCamera);
    this.mNoCollisionStab.draw(this.mCamera);
    this.mButton.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    
    if (this.mHero.mIsDead)
        this.mShowDeath.draw(this.mCamera);
};

SecondLevel.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.N)) {
        this.LevelSelect = "BossLevel";
        gEngine.GameLoop.stop();
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)) {
        this.LevelSelect = "restart";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsGoingLeft) {
        this.LevelSelect = "BossLevel";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsGoingRight) {
        this.LevelSelect = "FirstLevel";
        gEngine.GameLoop.stop();
    }
    if (this.mHero.mIsDead) {
        return;
    }

    this.mTrapP.update();
    this.mStabSetSet.update();
    this.mHero.update();
    this.mPlatSet.update();
    this.mBrokeSet.update();
    //this.mTrapSet.update();
    this.mNoCollisionStab.update();
    this.mButton.update();
    //console.log(this.mHero.getXform().getPosition());
    this.mSolveCol.update();
};



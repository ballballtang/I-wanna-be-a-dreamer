/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */

function Sentence(t) {
    this.mString1 = "Press Left/Right to move and Space to jump.";
    this.mString2 = "Press Space in the air to achieve double jump";
    this.mString3 = "Press Space longer to jump higher";
    this.mString4 = "Click C to shoot at the crushable wall";
    //this.mIcon = new Platform(t, -560, 262, 20, 20);
    
    this.mSentence1 = new UIText(this.mString1, [60, 140], 15, 0, 0, [
        0.7,
        0.5,
        0.6,
        1
    ]);
    this.mSentence2 = new UIText(this.mString2, [60, 160], 15, 0, 0, [
        0.7,
        0.5,
        0.6,
        1
    ]);
    this.mSentence3 = new UIText(this.mString3, [720, 260], 15, 0, 0, [
        0.7,
        0.5,
        0.6,
        1
    ]);
    this.mSentence4 = new UIText(this.mString4, [580, 630], 15, 0, 0, [
        0.7,
        0.5,
        0.6,
        1
    ]);
    this.mSentence2.setVisible(false);
    this.mSentence3.setVisible(false);
    this.mSentence4.setVisible(false);
}
gEngine.Core.inheritPrototype(Sentence, GameObject);

Sentence.prototype.positionDetect1 = function(x, y) {
    if (x >= -430 && x <= -83 && y >= -290 && y <= -130) {
        //this.mString = "Press Space in the air to achieve double jump";
        //this.visible = true;
        this.mSentence1.setVisible(false);
        this.mSentence2.setVisible(true);
        this.mSentence3.setVisible(false);
        this.mSentence4.setVisible(false);
    }
};
Sentence.prototype.positionDetect2 = function(x, y) {
    if (x >= 119.5 && x <= 472.5 && y >= -150 && y <= 140) {
        //this.mString = "Press Space longer to jump higher";
        //this.visible = true;
        this.mSentence1.setVisible(false);
        this.mSentence2.setVisible(false);
        this.mSentence3.setVisible(true);
        this.mSentence4.setVisible(false);
    }
};
Sentence.prototype.positionDetect3 = function(x, y) {
    if (x >= -600 && x <= 100 && y >= 160 && y <= 280) {
        //this.mString = "Click C to shoot at the crushable wall";
        //this.visible = true;
        this.mSentence1.setVisible(false);
        this.mSentence2.setVisible(false);
        this.mSentence3.setVisible(false);
        this.mSentence4.setVisible(true);
    }
};
Sentence.prototype.draw = function(aCamera) {
    //console.log(this.mSentence.getText());
    this.mSentence1.draw(aCamera);
    this.mSentence2.draw(aCamera);
    this.mSentence3.draw(aCamera);
    this.mSentence4.draw(aCamera);
    //this.mIcon.draw(aCamera);
};

Sentence.prototype.update = function(hform) {
    var x = hform.getXPos();
    var y = hform.getYPos();

    this.positionDetect1(x, y);
    this.positionDetect2(x, y);
    this.positionDetect3(x, y);
    //this.mSentence.setText(this.mString);
    //if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
    //    this.mString = " ";
    //    this.mSentence.setText(this.mString);
    //    this.visible = false;
    //}
};

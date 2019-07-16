/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global GameObject, gEngine */

function Sentence(t) {
    this.visible = true;
    this.mSentence = null;
    this.mString = "Press A/D to move and Space to jump.";
    this.mIcon = new Platform(t, -560, 262, 20, 20);
    this.mIcon.setVisibility(this.visible);
    this.mSentence = new UIText(this.mString, [65, 620], 30, 0, 0, [
        0.7,
        0.5,
        0.6,
        1
    ]);
    //console.log(this.mSentence.getText());
}
gEngine.Core.inheritPrototype(Sentence, GameObject);

Sentence.prototype.positionDetect1 = function(x, y) {
    if (x >= -430 && x <= -83 && y >= -290 && y <= -130) {
        this.mString = "Press Space in the air to achieve double jump";
        this.visible = true;
    }
};
Sentence.prototype.positionDetect2 = function(x, y) {
    if (x >= 119.5 && x <= 472.5 && y >= -150 && y <= 140) {
        this.mString = "Press Space longer to jump higher";
        this.visible = true;
    }
};
Sentence.prototype.positionDetect3 = function(x, y) {
    if (x >= -574 && x <= 100 && y >= 160 && y <= 280) {
        this.mString = "Click C to shoot at the crushable wall";
        this.visible = true;
    }
};
Sentence.prototype.draw = function(aCamera) {
    //console.log(this.mSentence.getText());
    this.mSentence.draw(aCamera);
    this.mIcon.draw(aCamera);
};

Sentence.prototype.update = function(hform) {
    var x = hform.getXPos();
    var y = hform.getYPos();

    this.positionDetect1(x, y);
    this.positionDetect2(x, y);
    this.positionDetect3(x, y);
    this.mSentence.setText(this.mString);
    this.mIcon.setVisibility(this.visible);
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        this.mString = " ";
        this.mSentence.setText(this.mString);
        this.visible = false;
    }
};

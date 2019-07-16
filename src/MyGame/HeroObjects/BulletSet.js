/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

function BulletSet(spriteTexture, pos) {
    this.kTex = spriteTexture;
    this.kPos = pos;

    GameObjectSet.call(this);
}
gEngine.Core.inheritPrototype(BulletSet, GameObjectSet);

BulletSet.prototype.addABullet = function (dir) {
    this.addToSet(new Bullet(this.kTex, this.kPos[0] + dir * 10, this.kPos[1] + 6, dir));
};

BulletSet.prototype.deleteBullet = function (index) {
    this.mSet.splice(index, 1);
};

BulletSet.prototype.update = function (dir) {
    GameObjectSet.prototype.update.call(this);
    for (var i = 0; i < this.size(); i++) {
        if (this.getObjectAt(i).mIsDead) {
            this.deleteBullet(i);
            i--;
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C)) {
        if (this.size() < 5) {
            this.addABullet(dir);
        }
    }
};
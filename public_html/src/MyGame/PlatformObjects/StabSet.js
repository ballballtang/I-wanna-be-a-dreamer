/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global GameObject, gEngine, WASDObj */

"use strict";

//llX -> lower left X
function StabSet(t, n, llX, llY) {
    GameObjectSet.call(this);
    
    this.kW = 46;
    this.kH = 46;
    
    this.stX = llX + this.kW / 2;
    this.stY = llY + this.kH / 2;
    
    for (var i = 0; i < n; i++) {
        var nowX = this.stX + i * this.kW;
        this.addToSet( new Stab(t, nowX, this.stY, this.kW, this.kH) );
    }
}
gEngine.Core.inheritPrototype(StabSet, GameObjectSet);


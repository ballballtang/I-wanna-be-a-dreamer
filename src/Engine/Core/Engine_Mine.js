/*
 * File: EngineCore.js 
 * The first iteration of what the core of our game engine would look like.
 */
/*jslint node: true, vars: true, evil: true, bitwise: true */
/*global document */
/* find out more about jslint: http://www.jslint.com/help.html */

//  Global variable EngineCore
//  the following syntax enforces there can only be one instance of EngineCore object
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Static refrence to gEngine
 * @type gEngine
 */
var gEngine = gEngine || { };
    // initialize the variable while ensuring it is not redefined

gEngine.Mine = (function () {
    var letsCheat = function () {
        gEngine.Mine.saveStatus.tribleJump = true;
        document.getElementById("LeftSpan").style.display = "block";
        document.getElementById("RightSpan").style.display = "block";
    }

    var mPublic = {
        letsCheat: letsCheat,
        saveStatus: {
            tribleJump: false,
            finishFirst: false,
        },
        restartLevel: () => new FirstLevel(),
    };

    return mPublic;
}());

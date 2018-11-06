(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Game_1 = require("Game");
// Call entrypoint
Game_1.Game.main();

},{"Game":2}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var GameRenderer_1 = require("render/GameRenderer");
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.init = function () {
        // Resolve canvas element
        var element = document.getElementById("webhexagon-canvas");
        if (!(element instanceof HTMLCanvasElement)) {
            throw new Error("Could not resolve game canvas element: #webhexagon-canvas");
        }
        this.canvasElement = element;
        // Create webgl context
        var contextAttributes = {
            alpha: false,
            depth: true,
            stencil: true,
            antialias: true,
            failIfMajorPerformanceCaveat: true
        };
        this.webglContext = this.canvasElement.getContext("webgl", contextAttributes);
        if (!this.webglContext) {
            throw new Error("Failed to create webgl context");
        }
        // Set canvas size
        this.canvasElement.width = Game.GAME_RES_X;
        this.canvasElement.height = Game.GAME_RES_Y;
        // Create game renderer
        this.gameRenderer = new GameRenderer_1.GameRenderer(this.webglContext);
    };
    Game.prototype.frame = function () {
        var gl = this.webglContext;
        gl.clearColor(0.0, 0.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };
    Game.prototype.run = function () {
        var _this = this;
        // Init game
        this.init();
        // Start game
        this.start();
        // Request first frame
        var mainloop = function () {
            _this.frame();
            window.requestAnimationFrame(mainloop);
        };
        window.requestAnimationFrame(mainloop);
    };
    Game.prototype.start = function () {
    };
    Game.main = function () {
        // Instantiate game
        this.gameInstance = new Game();
        // Run game
        this.gameInstance.run();
    };
    Game.instance = function () {
        return this.gameInstance;
    };
    Game.GAME_RES_X = 640;
    Game.GAME_RES_Y = 480;
    return Game;
}());
exports.Game = Game;

},{"render/GameRenderer":3}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var GameRenderer = /** @class */ (function () {
    function GameRenderer(glContext) {
        this.glContext = glContext;
    }
    GameRenderer.prototype.renderFrame = function () {
        var gl = this.glContext;
    };
    return GameRenderer;
}());
exports.GameRenderer = GameRenderer;

},{}]},{},[1]);

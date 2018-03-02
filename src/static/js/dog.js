"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function () {
    var DogAnimation = function () {
        function DogAnimation(canvas) {
            _classCallCheck(this, DogAnimation);

            this.canvas = canvas;
            canvas.width = window.innerWidth;
            window.onresize = function () {
                return canvas.width = window.innerWidth;
            };
            canvas.height = 200;
            // 记录上一帧的时间
            this.lastWalkingTime = Date.now();
            // 当前画的图片索引
            this.keyFrameIndex = -1;
            this.ctx = this.canvas.getContext("2d");
            // 图片目录
            this.RES_PATH = "img/";
            this.IMG_COUNT = 8;
            this.dog = {
                // 一步10px
                stepDistance: 9,
                // 狗的速度
                speed: 0.15,
                // 鼠标的x坐标
                mouseX: -1,
                // 往前走停留的位置
                frontStopX: -1,
                // 往回走停留的位置,
                backStopX: window.innerWidth
            };
        }

        _createClass(DogAnimation, [{
            key: "start",
            value: async function start() {
                await this.loadResources();
                this.pictureWidth = this.dogPictures[0].naturalWidth / 2;
                // 小狗初始化的位置放在最右边
                this.dog.mouseX = window.innerWidth - this.pictureWidth;
                this.recordMousePosition();
                window.requestAnimationFrame(this.walk.bind(this));
            }

            // 记录鼠标位置

        }, {
            key: "recordMousePosition",
            value: function recordMousePosition() {
                var _this = this;

                window.addEventListener("mousemove", function (event) {
                    _this.dog.frontStopX = event.clientX - _this.pictureWidth;
                    _this.dog.backStopX = event.clientX;
                });
                window.addEventListener("touchstart", function (event) {
                    _this.dog.frontStopX = event.touches[0].clientX - _this.pictureWidth;
                    _this.dog.backStopX = event.touches[0].clientX;
                });
            }

            // 加载图片

        }, {
            key: "loadResources",
            value: function loadResources() {
                var _this2 = this;

                var imagesPath = [];
                for (var i = 0; i <= this.IMG_COUNT; i++) {
                    imagesPath.push("" + this.RES_PATH + i + ".png");
                }
                var works = [];
                imagesPath.forEach(function (imgPath) {
                    works.push(new Promise(function (resolve) {
                        var img = new Image();
                        img.onload = function () {
                            return resolve(img);
                        };
                        img.src = imgPath;
                    }));
                });
                return new Promise(function (resolve) {
                    Promise.all(works).then(function (dogPictures) {
                        _this2.dogPictures = dogPictures;
                        resolve();
                    });
                });
            }
        }, {
            key: "walk",
            value: function walk() {
                var now = Date.now();
                var diffDistance = (now - this.lastWalkingTime) * this.dog.speed;
                if (diffDistance < this.dog.stepDistance) {
                    window.requestAnimationFrame(this.walk.bind(this));
                    return;
                }
                this.keyFrameIndex = ++this.keyFrameIndex % this.IMG_COUNT;
                var direct = -1,
                    stopWalking = false;
                // 如果鼠标在狗的前面则往前走
                if (this.dog.frontStopX > this.dog.mouseX) {
                    direct = 1;
                }
                // 如果鼠标在狗的后面则往回走
                else if (this.dog.backStopX < this.dog.mouseX) {
                        direct = -1;
                    }
                    // 如果鼠标在狗在位置
                    else {
                            stopWalking = true;
                            // 初始化的时候小狗是反方向的，frontStopX为初始值-1
                            // 说明鼠标还没动过
                            direct = this.dog.frontStopX === -1 ? -1 : this.dog.backStopX - this.dog.mouseX > this.pictureWidth / 2 ? 1 : -1;
                            this.keyFrameIndex = -1;
                            //this.dog.mouseX = this.dog.stopX;
                        }
                var ctx = this.ctx;
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                ctx.save();
                if (!stopWalking) {
                    this.dog.mouseX += this.dog.stepDistance * direct;
                }
                if (direct === -1) {
                    ctx.scale(direct, 1);
                }
                var img = this.dogPictures[this.keyFrameIndex + 1];
                var drawX = 0;
                drawX = this.dog.mouseX * direct - (direct === -1 ? this.pictureWidth : 0);
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, 20, 186, 162);
                ctx.restore();
                this.lastWalkingTime = now;
                window.requestAnimationFrame(this.walk.bind(this));
            }
        }]);

        return DogAnimation;
    }();

    var canvas = document.querySelector("#dog");
    var dogAnimation = new DogAnimation(canvas);
    dogAnimation.start();
}();
//# sourceMappingURL=dog.js.map

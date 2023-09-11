// Interface
// L & R buttons to step through backgrounds
// 1. Speed
// 2. Style with colours 0-3 (different colours 4-7) (Maybe make walkstyle different for each)
// 3. Gamestyle
// 4. Change hue

var game;

var ballDistance = 160;
var rotationSpeed = 2; // 2, 3, 4
var b1;
var b2;
var b3;
var b4
var edgeStyle = 1;
var style = 0; // 0: circles (same colour), 1: one vertical and one horizontal (different colours), 2: spinning vertical and horizontal (different colours), 3: walking feet (same colour)
var walkStyle = 0; // 0-3
var filter;
var filter2;
var newFilter = false;

var splash;
var button;
var button1;
var button2;
var button3;
var buttonl;
var buttonr;
var crosshairs;
var canvas;
var bdy;
var shaderNo = 0;

var uniforms = {
    bw: {
        type: '1f',
        value: 0.0
    }
}
var col1 = 0x00ff00;
var col2 = 0xff4040;

var gameStyle = 0; // 0: one object, 1: 2 objects mirrored, 2: 2 objects  
window.onload = function () {
    game = new Phaser.Game(1200, 800, Phaser.AUTO, "");
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");

    splash = document.querySelector('splash');
    bdy = document.getElementById('body');
    splash.onmousedown = function (e) {
        e.stopPropagation();
        splash.hidden = true;
    }
    button = document.querySelector('button');
    button1 = document.querySelector('button1');
    button2 = document.querySelector('button2');
    button3 = document.querySelector('button3');
    buttonl = document.querySelector('buttonl');
    buttonr = document.querySelector('buttonr');
    bdy = document.getElementById('body');
    button.onmousedown = function (e) {
        e.stopPropagation();
        Action(1);
    }
    button1.onmousedown = function (e) {
        e.stopPropagation();
        Action(2);
    }
    button2.onmousedown = function (e) {
        e.stopPropagation();
        Action(3);
    }
    button3.onmousedown = function (e) {
        e.stopPropagation();
        Action(4);
    }
    buttonl.onmousedown = function (e) {
        e.stopPropagation();
        Action(5);
    }
    buttonr.onmousedown = function (e) {
        e.stopPropagation();
        Action(6);
    }

    crosshairs = document.querySelector('crosshairs');
    crosshairs.hidden = true;
}


window.onkeypress = function (e) {
    if (!splash.hidden) {
        splash.hidden = true;
        return;
    }

    if (e.repeat)
        return;
    switch (e.keyCode) {
        case 32:
        case 49:
            Action(1);
            break;
        case 50:
            Action(2);
            break;
        case 51:
        case 13:
            Action(3);
            break;
        case 52:
            Action(4);
            break;
        case 53:
            toggleButtons();
            break;
        case 95:
            Action(5);
            break;
        case 43:
            Action(6);
            break;
    }
}

function toggleButtons() {
    button.hidden = !button.hidden;
    button1.hidden = !button1.hidden;
    button2.hidden = !button2.hidden;
    button3.hidden = !button3.hidden;
    buttonl.hidden = !buttonl.hidden;
    buttonr.hidden = !buttonr.hidden;
}

var player;
var player1;
var player2;
var player3;

function PlaySound(i) {
    try {
        switch (i) {
            case 1:
                if (player == undefined) {
                    player = document.getElementById('audio');
                    player.loop = false;
                }
                player.load();
                player.play();
                break;
            case 2:
                if (player1 == undefined) {
                    player1 = document.getElementById('audio1');
                }
                player1.load();
                player1.play();
                break;
            case 3:
                if (player2 == undefined) {
                    player2 = document.getElementById('audio2');
                }
                player2.load();
                player2.play();
                break;
            case 4:
                if (player3 == undefined) {
                    player3 = document.getElementById('audio3');
                }
                player3.load();
                player3.play();
                break;
        }
    } catch (e) {};
}


//    Button 4: colours - change hue(canvas) and invert(body and canvas) + ghosting
alternating = false;
var huecount = 0;
var invert = false;

function Action(i) {
    console.log(i);
    switch (i) {
        case 1:
            style++;
            if (style > 3) {
                style = 0;
            }
            if (style == 0) {
                that.balls[0].scale.x = 1;
                that.balls[0].scale.y = 1;
                that.balls[1].scale.x = 1;
                that.balls[1].scale.y = 1;
                that.balls1[0].scale.x = 1;
                that.balls1[0].scale.y = 1;
                that.balls1[1].scale.x = 1;
                that.balls1[1].scale.y = 1;
            } else {
                that.balls[0].scale.x = 1.5;
                that.balls[0].scale.y = .5;
                that.balls[1].scale.x = .5;
                that.balls[1].scale.y = 1.5;
                that.balls1[0].scale.x = 1.5;
                that.balls1[0].scale.y = .5;
                that.balls1[1].scale.x = .5;
                that.balls1[1].scale.y = 1.5;
                that.balls[0].angle = 0;
                that.balls[1].angle = 0;
                that.balls1[0].angle = 0;
                that.balls1[1].angle = 0;
            }
            PlaySound(2);
            break;
        case 2:
            rotationSpeed++;
            if (rotationSpeed > 4)
                rotationSpeed = 1;
            walkStyle = that.rnd.integerInRange(0, 3);
            PlaySound(1);
            break;
        case 3:
            gameStyle++;
            if (gameStyle > 2) {
                gameStyle = 0;
                //                alternating = !alternating;
            }
            if (gameStyle == 1 && that.balls[0].x > 1200 / 4) {
                that.balls[0].x = 1200 / 4;
            }
            if (gameStyle == 1 && that.balls[1].x > 1200 / 4) {
                that.balls[1].x = 1200 / 4;
            }
            for (i = 0; i < 50; i++)
                that.update();
            PlaySound(3);
            break;
        case 4: //   hue shift/colours
            huecount++;
            if (huecount > 5) {
                huecount = 0;
                invert = !invert;
            }
            if (invert) {
                bdy.style.filter = "invert(100%) hue-rotate(" + (huecount * 60) + "deg)";
                button.style.filter = button1.style.filter = button2.style.filter = button3.style.filter = buttonl.style.filter = buttonr.style.filter = "invert(100%)"
            } else {
                bdy.style.filter = "hue-rotate(" + (huecount * 60) + "deg)";
                button.style.filter = button1.style.filter = button2.style.filter = button3.style.filter = buttonl.style.filter = buttonr.style.filter = ""
            }
            PlaySound(4);
            break;
        case 5: // previous set
            shaderNo--;
            if (shaderNo < 0)
                shaderNo = 18;
            filter = new Phaser.Filter(game, uniforms, game.cache.getShader('background' + shaderNo.toString()));
            filter.setResolution(game.width, game.height);
            sprite.filters = [filter];
            break;
        case 6: // next set
            shaderNo++;
            if (shaderNo > 18)
                shaderNo = 0;
            filter = new Phaser.Filter(game, uniforms, game.cache.getShader('background' + shaderNo.toString()));
            filter.setResolution(game.width, game.height);
            sprite.filters = [filter];
            break;
        case 7: // toggle buttons
            toggleButtons();
            break;
    }
}

var playGame = function (game) {};
var direction = 1;
var direction1 = 1;
var upKey;
var changeCount = 0;
var changeCount1 = 0;
var theShader;
var shaderCount = 0;
var sprite;
var newFiler = false;
var that;
playGame.prototype = {
    preload: function () {
        //        game.load.shader('blueDots', 'assets/shaders/blue-dots.frag');
        //        game.load.shader('bacteria', 'assets/shaders/bacteria.frag');
        for (i = 0; i <= 18; i++)
            game.load.shader('background' + i.toString(), 'assets/shaders/' + i.toString() + '.frag');
        game.load.image("firstball", "whiteball.png");
        game.load.image("secondball", "whiteball.png");
        game.load.image("arm", "arm.png");
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //        game.scale.scaleMode = Phaser.ScaleManager.FIT;
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    },
    create: function () {
        that = this;
        filter = new Phaser.Filter(game, uniforms, game.cache.getShader('background0'));
        filter.setResolution(game.width, game.height);

        filter.uniforms.bw = 0.;

        sprite = game.add.sprite();
        sprite.width = game.width;
        sprite.height = game.height;

        sprite.filters = [filter];

        this.arm = game.add.sprite(game.width / 3, game.height / 2, "arm");
        this.arm.anchor.set(0, 0.5);
        this.balls = [
               b1 = game.add.sprite(game.width / 3, game.height / 2, "firstball"),
               b2 = game.add.sprite(game.width / 3, game.height / 2, "firstball")
          ]
        this.balls[0].anchor.set(0.5);
        this.balls[1].anchor.set(0.5);
        if (style > 0) {
            this.balls[0].scale.x = 1.5;
            this.balls[0].scale.y = .5;
            this.balls[1].scale.x = .5;
            this.balls[1].scale.y = 1.5;
        }

        b1.alpha = 0.95;
        b2.alpha = 0.95;
        b1.tint = col1;
        b2.tint = col2;
        b1.blendMode = Phaser.blendModes.NORMAL; //ADD; //SCREEN;

        this.rotationAngle = 0;
        this.rotatingBall = 1;

        this.arm1 = game.add.sprite(game.width / 2, game.height / 2, "arm");
        this.arm1.anchor.set(0, 0.5);
        this.balls1 = [
               b3 = game.add.sprite(game.width / 3, game.height / 2, "firstball"),
               b4 = game.add.sprite(game.width / 3, game.height / 2, "firstball")
          ]
        this.balls1[0].anchor.set(0.5);
        this.balls1[1].anchor.set(0.5);
        if (style > 0) {
            this.balls1[0].scale.x = 1.5;
            this.balls1[0].scale.y = .5;
            this.balls1[1].scale.x = .5;
            this.balls1[1].scale.y = 1.5;
        }

        b3.alpha = 0.95;
        b4.alpha = 0.95;
        b3.tint = col1;
        b4.tint = col2;

        this.rotationAngle1 = 90;
        this.rotatingBall1 = 1;
        if (gameStyle == 2) {
            for (i = 0; i < 50; i++)
                this.update();
        } else
            this.update();
    },
    update: function () {
        if (gameStyle == 0) {
            this.balls1[0].alpha = 0;
            this.balls1[1].alpha = 0;
            this.arm1.alpha = 0;
            this.arm.alpha = 0;
        } else {
            this.balls1[0].alpha = 1;
            this.balls1[1].alpha = 1;
            this.arm.alpha = 1;

            this.arm1.alpha = 1;
        }

        filter.update();
        //        filter2.update();
        b1.tint = col1;
        b2.tint = col2;
        b3.tint = col1;
        b4.tint = col2;
        // group 1
        changeCount++;
        if (gameStyle == 1 && this.balls[this.rotatingBall].x > 1200 / 2 - 40) {
            direction = -direction;
            changeCount = 0;
            this.balls[this.rotatingBall].tint = 0xfff0f0;
            this.balls1[this.rotatingBall].tint = 0xfff0f0;
        }
        if (this.balls[this.rotatingBall].x < 20 || this.balls[this.rotatingBall].x > 1200 - 20 || this.balls[this.rotatingBall].y < 20 || this.balls[this.rotatingBall].y > 800 - 20) {
            if (edgeStyle == 0) { // don't use this???
                if (Math.random() > .1) {
                    direction = -direction;
                    changeCount = 0;
                }
            } else {
                // do nothing and it swings around
            }
        } else {
            if (walkStyle == 0) {
                if (changeCount > 10 * (5 - rotationSpeed)) {
                    changeCount = 0;
                    this.changeBall();
                }
            } else if (walkStyle == 1) {
                if (changeCount > 25 * (5 - rotationSpeed)) {
                    changeCount = 0;
                    this.changeBall();
                }
            } else if (walkStyle == 2) {
                if (Math.random() < 0.015 * rotationSpeed) this.changeBall();
            } else {
                if (Math.random() < 0.05 * rotationSpeed) this.changeBall();
            }
        }
        this.rotationAngle = (this.rotationAngle + direction * rotationSpeed * (this.rotatingBall * 2 - 1)) % 360;
        this.arm.angle = (this.rotationAngle + 90) % 360;

        // walking feet
        if (style == 3) {
            this.balls[0].angle = this.rotationAngle + 20; // + Math.random() * 15;;
            this.balls[1].angle = this.rotationAngle - 110; //- Math.random() * 15;
            this.arm.alpha = 0;
            this.arm1.alpha = 0;
        } else {
            this.arm.alpha = 1;
            if (gameStyle > 0)
                this.arm1.alpha = 1;
        }
        if (style == 2) {
            this.balls[0].angle += 1;
            this.balls[1].angle -= 1;
        }
        //this.balls[0].angle = this.balls[1].angle - 90;

        this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - ballDistance * Math.sin(Phaser.Math.degToRad(this.rotationAngle));
        this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + ballDistance * Math.cos(Phaser.Math.degToRad(this.rotationAngle));

        // group2
        if (gameStyle == 0)
            return;
        else if (gameStyle == 1) {
            this.balls1[0].x = 1200 - this.balls[0].x;
            this.balls1[1].x = 1200 - this.balls[1].x;
            this.balls1[0].y = this.balls[0].y;
            this.balls1[1].y = this.balls[1].y;
            this.arm1.position = this.balls1[1 - this.rotatingBall].position;
            this.arm1.angle = (180 - this.arm.angle) % 360;
            this.balls1[0].angle = 180 - this.balls[0].angle;
            this.balls1[1].angle = 180 - this.balls[1].angle;
        } else if (gameStyle == 2) {
            changeCount1++;
            if (this.balls1[this.rotatingBall1].x < 20 || this.balls1[this.rotatingBall1].x > 1200 - 20 || this.balls1[this.rotatingBall1].y < 20 || this.balls1[this.rotatingBall1].y > 800 - 20) {
                if (edgeStyle == 0) {
                    if (Math.random() > .1) {
                        direction1 = -direction1;
                        changeCount1 = 0;
                    }
                } else {
                    // do nothing and it swings around
                }
            } else {
                if (walkStyle == 0) {
                    if (changeCount1 > 10 * (5 - rotationSpeed)) {
                        changeCount1 = 0;
                        this.changeBall1();
                    }
                } else if (walkStyle == 1) {
                    if (changeCount1 > 25 > 25 * (5 - rotationSpeed)) {
                        changeCount1 = 0;
                        this.changeBall1();
                    }
                } else if (walkStyle == 2) {
                    if (Math.random() < 0.015 * rotationSpeed) this.changeBall1();
                } else {
                    if (Math.random() < 0.05 * rotationSpeed) this.changeBall1();
                }
            }
            this.rotationAngle1 = (this.rotationAngle1 + direction1 * rotationSpeed * (this.rotatingBall1 * 2 - 1)) % 360;
            this.arm1.angle = (this.rotationAngle1 + 90) % 360;

            // walking feet
            if (style == 3) {
                this.balls1[0].angle = this.rotationAngle1 + 20;
                this.balls1[1].angle = this.rotationAngle1 - 110;
            } else
            if (style == 2) {
                this.balls1[0].angle += 1;
                this.balls1[1].angle -= 1;
            }

            this.balls1[this.rotatingBall1].x = this.balls1[1 - this.rotatingBall1].x - ballDistance * Math.sin(Phaser.Math.degToRad(this.rotationAngle1));
            this.balls1[this.rotatingBall1].y = this.balls1[1 - this.rotatingBall1].y + ballDistance * Math.cos(Phaser.Math.degToRad(this.rotationAngle1));
        }
    },
    changeBall: function () {
        //        b2.tint = Math.random() * 0xffffff;

        this.arm.position = this.balls[this.rotatingBall].position;
        this.rotatingBall = 1 - this.rotatingBall;
        this.rotationAngle = (this.balls[1 - this.rotatingBall].position.angle(this.balls[this.rotatingBall].position, true) - 90) % 360;
        if (gameStyle == 1)
            this.changeBall1();
    },
    changeBall1: function () {
        //b1.tint = Math.random() * 0xffffff;
        this.arm1.position = this.balls1[this.rotatingBall1].position;
        this.rotatingBall1 = 1 - this.rotatingBall1;
        this.rotationAngle1 = (this.balls1[1 - this.rotatingBall1].position.angle(this.balls1[this.rotatingBall1].position, true) - 90) % 360;
    }
}

function showPressedButton(index) {
    //      console.log("Pressed: ", index);
    if (!splash.hidden) { // splash screen
        splash.hidden = true;
    } else {
        switch (index) {
            case 0: // A
                Action(1);
                break;
            case 8:
                toggleButtons();
                break
            case 9:
                Action(5);
                break;
            case 1: // B
                Action(2);
                break;
            case 2: // X
                Action(3);
                break;
            case 3: // Y
                Action(4);
                break;
            case 4: // LT
            case 6: //
                Action(5);
                break;
            case 5: // RT
            case 7: //
                Action(6);
                break;
            case 10: // XBox
                break;
            case 12: // dpad handled by timer elsewhere
            case 13:
            case 14:
            case 15:
                break;
            default:
        }
    }
}

function removePressedButton(index) {}

var gpad;


gamepads.addEventListener('connect', e => {
    console.log('Gamepad connected:');
    console.log(e.gamepad);
    gpad = e.gamepad;
    e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
    e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
    //       e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, true),
    //            StandardMapping.Axis.JOYSTICK_LEFT);
    //        e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, false),
    //            StandardMapping.Axis.JOYSTICK_RIGHT);

});

gamepads.addEventListener('disconnect', e => {
    console.log('Gamepad disconnected:');
    console.log(e.gamepad);
});

gamepads.start();

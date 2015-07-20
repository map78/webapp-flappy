// the Game object used by the phaser.io library


var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */



var score = 0;
var labelScore;
var player;
var pipes = [];



function preload() {
    game.load.image("LalaImg", "../assets/Lala.png")
    game.load.image("playerImg", "../assets/PGriffin.png");
    game.load.image("altairImg", "../assets/altair.jpg")
game.load.image("pikachuImg", "../assets/Pikachu.png")
game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe", "../assets/pipe.png");
    game.load.image("flappydead", "../assets/Flappydied.png");
}



function changeScore() {
    score = score + 1;
labelScore.setText(score.toString());
}


function moveRight() {player.x = player.x + 20}

function moveLeft() {player.x = player.x - 20}

function moveUp() {player.y = player.y - 20}

function moveDown() {player.y = player.y + 20}
/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor("#00CC99");
    game.add.text(20, 20, "Character Brawl 2015", {font: "30px Arial", fill: "#FFFFFF"});
    //game.add.sprite(10, 270, "playerImg" );
   game.add.sprite(70, -50, "pikachuImg" );
    //game.add.sprite(200, 40, "LalaImg");
    game.add.sprite(80, 40, "flappydead");
    //var background = game.add.sprite(70, 50, "altairImg" );
  // background.width = 100;
    //background.height = 150;
    /*game.input
        .onDown
        .add(clickHandler);*/
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    game.input
        .onDown.add(keyboard);
//alert(score);

    labelScore = game.add.text(20, 20, "0");


    player = game.add.sprite(100, 200, "playerImg");
    game.physics.arcade.enable(player);

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
    player.x = player.x + 1;
    //player.x;
   // player.kill();
    generatePipe();
    //game.add.sprite(20, 0, "pipe");
    //generatePipe();
    //game.add.sprite(20, 50, "pipe");
    //generatePipe();
    //game.add.sprite(20, 100, "pipe");

    player.body.velocity.x = 10;
    player.body.velocity.y = -10;
    player.body.gravity.y = 400;

    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);

    pipeInterval = 1.75;
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);
}

function playerJump() {
    player.body.velocity.y = -200;
}



function spaceHandler() {
    game.sound.play("score");
}

function generatePipe() {
    var gap = game.rnd.integerInRange(1, 5);
    //console.log(gap);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap+2 && count != gap +1) {
            addPipeBlock(750, count*50);
       }
    }
    changeScore();
}

function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y, "pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200
}


//function clickHandler(event) {game.add.sprite(event.x, event.y, "pikachuImg");}

function keyboard(event) {game.add.sprite(event.x, event.y, "pikachuImg");}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    for(var index=0; index<pipes.length; index++) {
        game.physics.arcade
            .overlap(player,
            pipes[index],
            gameOver);
    }
}

function gameOver() {
    location.reload();
}



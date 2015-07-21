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
/*

jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting="Hello ";
    var name = jQuery("#fullName").val();
    var greeting_message = greeting + name;
 jQuery("#greeting-form").hide();
    jQuery("#greeting").append("<p>" + greeting_message + "<p>");
    //event_details.preventDefault();
});
*/


function preload() {
    game.load.image("LalaImg", "../assets/Lala.png");
    game.load.image("playerImg", "../assets/PGriffin.png");
    game.load.image("altairImg", "../assets/altair.jpg");
game.load.image("pikachuImg", "../assets/pikachu[1].png");
game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe", "../assets/pipe.png");
    game.load.image("flappydead", "../assets/Flappydied.png");
    game.load.image("slender", "../assets/Slender_Man[1].png");
    //game.load.image("trampoline", "../assets/trampoline.png");
    game.load.image("spiderman", "../assets/spiderman.png");
    game.load.image("gummybears", "../assets/gummybears.png");
    game.load.image("fire", "../assets/fire.png");
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
    game.stage.setBackgroundColor("#000000");
    game.add.text(20, 20, "Character Brawl 2015", {font: "30px Arial", fill: "#FFFFFF"});
    //game.add.sprite(10, 270, "playerImg" );
    var background = game.add.sprite(0, 0, "fire" );
   game.add.sprite(300, -50, "pikachuImg" );
    game.add.sprite(30, 40, "LalaImg");
    game.add.sprite(200, 40, "flappydead");
    game.add.sprite(500, 50, "slender");
    game.add.sprite(310, 200, "spiderman");
    game.add.sprite(100, 200, "gummybears");
   background.width = 1000;
    background.height = 500;
    /*game.input
        .onDown
        .add(clickHandler);*/
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    game.input
        .onDown.add(keyboard);
//alert(score);

    labelScore = game.add.text(20, 20, "0", {fill: "#FFFFFF"});


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
    player.body.gravity.y = 300;

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
   //location.reload();
    //player.destroy();
    $("#score").val(score.toString());
    $("#greeting").show();
    game.destroy();

}
$.get("/score", function(scores) {
scores.sort(function (scoreA, scoreB){
    var difference = scoreB.score - scoreA.score;
    return difference;
});
for (var i = 0; i < scores.length; i++) {
    $("#scoreBoard").append(
        "<li>" +
        scores[i].name + ": " + scores[i].score +
        "</li>");
}
});

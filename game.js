var buttonColors = ["green", "red", "blue", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var level = 1;
var started = false;

function flash(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 200);
}

function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function gameOver() {
    $("h1").text("Game Over, Press any key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();

    gamePattern = [];
    userChosenPattern = [];
    level = 1;
    started = false;
}

function nextSequence() {
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    
    console.log(gamePattern);

    flash(randomColor);
    playSound(randomColor);    
}

$(".btn").on("click", function(event) {
    var userChosenColor = event.target.id;
    userChosenPattern.push(userChosenColor);
    flash(userChosenColor);
    playSound(userChosenColor);

    // console.log(userChosenPattern);

    var gamePatternLength = gamePattern.length;
    var userPatternLength = userChosenPattern.length;

    // console.log(userChosenPattern[userPatternLength-1]);
    // console.log(gamePattern[userPatternLength-1]);

    if(userChosenPattern[userPatternLength-1] !== gamePattern[userPatternLength-1]) {
        gameOver();
        return;
    }
    if(gamePatternLength === userPatternLength) {
        level = (parseInt(level) + 1);
        userChosenPattern = [];
        setTimeout(nextSequence, 500);        
    }
    
});

$("body").on("keypress", function() {
    if (!started) {
        started = true;
        alert("Starting Simon");
        gamePattern = [];
        userChosenPattern = [];
        level = 1;
        nextSequence(); 
    } 
});
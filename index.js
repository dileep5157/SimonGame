var colorArr = ["green", "blue", "red", "yellow"];

var randomPattrenArr = [];
var userPattrenArr = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started){
        $("h1").html("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(){
    var clickedColor = $(this).attr("id");
    userPattrenArr.push(clickedColor);

    soundToPlay(clickedColor);
    pressedAnimation(clickedColor);

    userClicked(userPattrenArr.length -1);
})


function nextSequence(){
    userPattrenArr = [];
    level++;
    $("h1").html("Level " + level);
    var randomVal = Math.floor(Math.random() * colorArr.length);
    var randomColor = colorArr[randomVal];
    randomPattrenArr.push(randomColor);

    $("#"+randomColor).fadeOut(500).fadeIn(500);
    soundToPlay(randomColor);
}

function userClicked(currentLevel){
    if(randomPattrenArr[currentLevel] === userPattrenArr[currentLevel]){
        if(randomPattrenArr.length === userPattrenArr.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    } else {
        soundToPlay("wrong");
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);

        gameOver();
    }
}

function soundToPlay(value){
    var audio = new Audio("sounds/" + value + ".mp3");
    audio.play();
}

function pressedAnimation(value){
    $("#"+ value).addClass("pressed");
    setTimeout(function() { $("#"+value).removeClass("pressed") }, 100);
}


function gameOver(){
    level = 0;
    started = false;
    randomPattrenArr = [];
}

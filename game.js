var level = 0;

var userClickedPattern =[  ];
var gamePattern =[  ];


var buttonColors = [ "red", "blue", "green", "yellow" ];


function nextSequence(){    
    var randomNumber = Math.floor(Math.random()*3);
    console.log(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    level++;
    $("h1").text("Level "+level);    
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);   
    playSound(randomChosenColor); 
}


$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length-1));
})

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");    
    // console.log(currentColor);
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}


function playSound(name){
    switch (name) {
        case "green":
        var green = new Audio('./sounds/green.mp3');
        green.play();
        break;
        case "blue":
        var blue = new Audio('./sounds/blue.mp3');
        blue.play();
        break;
        case "red":
        var red = new Audio('./sounds/red.mp3');
        red.play();
        break;
        case "yellow":
        var yellow = new Audio('./sounds/yellow.mp3');
        yellow.play();
        break;    
        default: console.log(name);
    }
}
// console.log(buttonColors[randomChosenColor]);
let gameStatus = false;
$(document).on("keydown",function(){    
    if(!gameStatus){
        $("#level-title").text("level "+ level);
        nextSequence();    
        gameStatus = true;
    }
});

// for mobile

// $(document).on("touchstart",function(){
//     nextSequence();
//     // $("h1").text("Level 0");
// });

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern =[  ];
}

function checkAnswer(currentLevel){
    // console.log(currentLevel);
    console.log(userClickedPattern);
    console.log(gamePattern);
    if( userClickedPattern[currentLevel] == gamePattern[currentLevel] ){
        console.log("success");
        if( userClickedPattern.length == gamePattern.length ){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            },1000)
        }
    }
    else{
        var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart")
        console.log("wrong");
        startOver();
    }
}


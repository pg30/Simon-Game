var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var started = false,level=0;

function nextSequence()
{
    level++;
    $("h1").text("Level - "+level);
    var randomNumber = Math.floor(Math.random()*4);
    //console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    //console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour);
}

function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    console.log(""+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    setTimeout(function my() {
        $("."+currentColour).removeClass("pressed");  
    },100);
}

function checkAnswer(currentLevel)
{
    console.log("user....."+userClickedPattern);
    console.log("game....."+gamePattern);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function my(){
                userClickedPattern.splice(0,userClickedPattern.length);
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press any key to restart");
            startOver();
        },200);
        console.log("failure");
    }
}

function startOver()
{
    level=0;
    started=false;
    gamePattern.splice(0,gamePattern.length);
    userClickedPattern.splice(0,userClickedPattern.length);
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);    
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function() {
    if(started === false)
    {
        level=0;
        $("h1").text("Level - "+level);
        started = true;
        nextSequence();
    }
});
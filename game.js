var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Makig it responsive for different device size
var deviceWidth = $(window).width();
if (deviceWidth <= 484){
  $("h1").text("Touch 👉ME👈 to start");
}

//To start the game only when any keypress is detected.
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Score:" + level);
    nextSequence();
    started = true;
  }
});

//To start the game on mobile devices
$("h1").on("touchstart",function () {
  if (!started){
    $("h1").text("Score"+level);
    nextSequence();
    started= true;
  }
})
//For user
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setInterval(() => {
      $("body").removeClass("game-over");
    }, 200);

    if (deviceWidth <= 650){
      $("#level-title").text("Game Over!Your Final Score is:" + level + ".Press Me to restart");
    }
    else{
      $("#level-title").text(
        "Game Over!Your Final Score is:" + level + ".Press any key to restart"
      );
    }
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//For random next sequence
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Score: " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//Plays sound when any of the button is triggered
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//To confirm that the button was actually pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

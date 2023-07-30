var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  userClickedPattern = [];

  (function myLoop(i) {
    setTimeout(function() {
      playSound(gamePattern[gamePattern.length-i]);
      animatePress(gamePattern[gamePattern.length-i]);                
      if (--i) myLoop(i);
    }, 500)
  })(gamePattern.length);
  
  level += 1;
  $("h1").text(level);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).fadeOut(100).fadeIn(100);
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

function handleClick(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
}

function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] != userClickedPattern[i]) {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(startOver, 200)
      return;
    }
  }

  function startOver() {
    $("body").removeClass("game-over");
    $("h1").text("Game over. Press any key to restart.");
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
  }

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(nextSequence, 1000);
  }
}

$("body").on("keypress", function() {
  if (gamePattern.length == 0) {
    nextSequence();
    $("h1").text(level);
  }
});

$(".btn").on("click", function(event) {
  if (gamePattern.length == 0) {
    return;
  }
  handleClick(event);
});
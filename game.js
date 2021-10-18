//  TODO: Global variables for button color, game pattern, and user pattern
let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameState = false;
let level = 0;
let gameOver = "Game over, Press Any Key to Restart";

//  TODO: Start the game when a keyboard is pressed
$(document).keydown((event) => {
  //  If the game hasn't started, then start the game
  if (!gameState) {
    $("#level-title").text("Level " + level);
    nextSequence();

    gameState = true; // Set teh game state to true
  }
});

//  TODO: Function for getting the next sequence of colors
nextSequence = () => {
  // Reset the user array to empty to have a clean slate
  userClickedPattern = [];

  //  Generate random num and color
  let randomNum = getRandomInt(4);
  let randomColor = buttonColors[randomNum];

  //  Add the level increment to go to the next level and update the level text
  $("#level-title").text("Level " + level);
  level++;

  //  Push the random color to the game pattern
  gamePattern.push(randomColor);

  //  Flash the button when clicked
  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //  Play the corresponding sound with 'playSound' function
  playSound(randomColor);
};

//  TODO: Add an event listener for which button was clicked
$(".btn").click(function () {
  //  Get the user chosen color id by using the attribute
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  //  Play the corresponding sound with the id clicked
  playSound(userChosenColor);

  //  Animate the press when button is clicked
  animatePress(userChosenColor);

  //  Check the answer of the user once the button is clicked
  checkAnswer(userClickedPattern.length - 1);
});

//  TODO: Check the pattern of the user to the robots
checkAnswer = (currentLevel) => {
  //  If the game pattern element is the same as the user element and it's the same length, then keep going
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //  Play the "wrong" sound when the user get's it wrong
    let sound = new Audio("sounds/wrong.mp3");
    sound.play();

    //  Add a the 'flashing' css to the body
    $(document.body).addClass("game-over");

    setTimeout(() => {
      $(document.body).removeClass("game-over");
    }, 200);

    //  Set the heading title to "game over"
    $("h1").text(gameOver);

    //  Start the game over again
    startOver();
  }
};

//  TODO: Function to play a sound, taking one input
playSound = (soundInput) => {
  let sound = new Audio("sounds/" + soundInput + ".mp3");
  sound.play();
};

//  TODO: Function to animate the user clicked button
animatePress = (currentColor) => {
  //  Get the current button pressed by storing it
  let currButt = $("#" + currentColor);

  //  Add the presssed button then fade in to removing the class
  currButt.addClass("pressed");

  //  Remove the class 'pressed' with a timeout
  setTimeout(() => {
    currButt.removeClass("pressed");
  }, 150);
};

//  Method to generate a random number
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//  TODO: Call this function to start the game over
startOver = () => {
  level = 0;
  gamePattern = [];
  gameState = false;
};

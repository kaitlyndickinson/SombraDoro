/* CONSTANTS */
const SEC_IN_MIN = 60;
const MIN_30 = SEC_IN_MIN * 30;
const MIN_60 = SEC_IN_MIN * 60;

/* VARIABLES */
let interval;
let isPaused = true; 
let countdownWasStarted = false;
let pomodoroDuration = MIN_60; // Default value
let timeLeftInSeconds = 0;

/* FUNCTIONS */
// Changes the countdown duration between 30 and 60 minutes whenever the skull icon is clicked
function updateDuration() {
  if(pomodoroDuration == MIN_60 ) {
    pomodoroDuration = MIN_30;
  } else {
    pomodoroDuration = MIN_60;
  }
  timeLeftInSeconds = pomodoroDuration
  updateTimeString()
}

// Called when the button has been pressed
function playPauseCountdown() {
  isPaused = !isPaused
  updatePlayPauseButton();

  if(!countdownWasStarted) {
    // This function could be called after initiating the timer,
    // so we need to differentiate when its start vs pause vs resume
    resetCountdown()
    updateTimeString()
  }
  countdownWasStarted = true

  if(isPaused) {
    stopCountdown() 
  } else {
    // Update the interval every one second
    interval = setInterval(updateCountdown, 1000);
  }
}

// Called whenever the refresh button is clicked
function restartCountdown() {
  // When we reset the countdown, stop the interval and reset things back to normal
  stopCountdown()
  resetCountdown()

  isPaused = true
  updatePlayPauseButton()
  updateTimeString()
}

// Called every second until timer reaches 0 or the button is paused
function updateCountdown() {
  if(isPaused) {
    return
  }

  timeLeftInSeconds--; 

  updateTimeString();

  if(timeLeftInSeconds == 0) {
    playEndSound()
    stopCountdown()
    isPaused = true
    updatePlayPauseButton()
  }
}

function pauseCountdown() {
  isPaused = !isPaused;
}

// Called when the button is paused, reset or timer reaches zero
function stopCountdown() {
  clearInterval(interval)
}

// Called when the refresh button is clicked or on a new countdown
function resetCountdown() {
  isPaused = false
  timeLeftInSeconds = pomodoroDuration
}

// Called when the user clicks the play or pause button, and updates the button to display correct changes
function updatePlayPauseButton() {
  let playPauseImageSrc;

  if(isPaused) {
    playPauseImageSrc = "playButton.png"
  } else {
    playPauseImageSrc = "pauseButton.png"
  }
  document.getElementById("playPause").src = playPauseImageSrc;
}

// Updates the time string to display the correct minutes and seconds
function updateTimeString() {
  let minutes = Math.floor(timeLeftInSeconds / SEC_IN_MIN); 
  let seconds = timeLeftInSeconds % SEC_IN_MIN;

  if(seconds < 10) {
    secondsOutput = "0" + seconds
  } else {
    secondsOutput = seconds
  }
  document.getElementById("countdown").innerHTML = minutes + ":" + secondsOutput;
}

// Called when the timer is complete
function playEndSound() {
  var endAudio = document.getElementById("endAudio");
  endAudio.play();

  document.getElementById("countdown").innerHTML = "boop!";
}

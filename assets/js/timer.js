// Alarm sound

var alarmSound = new Audio('assets/06_Urban_Beat.mp3');
alarmSound.volume = 0.3;


var timerTime = 0,          // Time set on the interval.
    timerInterval = 0;      // The interval for our loop.

var timerClock = $(".container.timer").find(".clock"),
    timerInput = $('#timer-input'),
    timerSoundsButton = $('#timer-sounds');

// If there is a valid set time from last session, set it again.
if(Number(localStorage.lastTimerTime)){
    timerTime = Number(localStorage.lastTimerTime) * 60;

    timerClock.text(returnFormattedToSeconds(timerTime));
    timerInput.val(localStorage.lastTimerTime);
}

if(localStorage.timerSounds == 'true'){
    timerSoundsButton.prop('checked', true);
}

// When entering new time, the app will trim it and turn it into seconds (*60).
timerInput.on('change', function () {

    var newTime = timerInput.val().trim();

    if(newTime && newTime>=0) {
        timerTime = newTime * 60;
        localStorage.lastTimerTime = newTime;
        timerClock.text(returnFormattedToSeconds(timerTime));
    }
    
});

$('.timer-btn.start').on('click',function(){
    if(timerTime>0) {
        startTimer();
    }
});

$('.timer-btn.pause').on('click', function () {
    pauseTimer();
});

$('.timer-btn.reset').on('click', function () {
    resetTimer();
});

// Timer sounds button

timerSoundsButton.on('change', function () {
    localStorage.timerSounds = this.checked;
});

// Clicking on the clock.

timerClock.on('click',function(e){

    if(timerClock.hasClass('inactive')){
        if(timerTime>0) {
            startTimer();
        }
    }
    else{
        pauseTimer();
    }

});

function startTimer() {

    // Prevent multiple intervals going on at the same time.
    clearInterval(timerInterval);

    // Every 1000ms (1 second) decrease the set time until it reaches 0.
    timerInterval = setInterval(function () {
        timerTime--;
        timerClock.text(returnFormattedToSeconds(timerTime));

        if (timerTime <= 0) {
            if(localStorage.timerSounds == 'true'){
                alarmSound.play();
            }

            timerClock.text(returnFormattedToSeconds(0));

            $('#times-up-modal').openModal();

            pauseTimer();
        }
    }, 1000);

    timerInput.prop('disabled', true);
    timerClock.removeClass('inactive');
}


function pauseTimer(){
    clearInterval(timerInterval);

    timerInput.prop('disabled', false);
    timerClock.addClass('inactive');
}

// Reset the clock with the previous valid time.
// Useful for setting the same alarm over and over.
function resetTimer(){
    pauseTimer();

    if(Number(localStorage.lastTimerTime)){
        timerTime = Number(localStorage.lastTimerTime) * 60;
        timerClock.text(returnFormattedToSeconds(timerTime));
    }
}


// Dismissing alarm sounds from the modal.

$('.dismiss-alarm-sounds').on('click', function(){
    alarmSound.pause();
    alarmSound.currentTime = 0;

    $('#times-up-modal').closeModal();
});


function returnFormattedToSeconds(time){
    var minutes = Math.floor(time / 60),
        seconds = Math.round(time - minutes * 60);

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}
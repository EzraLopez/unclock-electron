// Alarm sound

var alarmSound = new Audio('assets/06_Urban_Beat.mp3');
alarmSound.volume = 0.3;


var alarmInterval = 0,      // Our setInterval variable for controlling the loop.
    alarmTime = 0;          // The time the alarm is set to.

var alarmClock = $('.container.alarm').find('.clock'),
    alarmInput = $('#alarm-input'),
    alarmButton = $('#alarm-btn'),
    alarmSoundsButton = $('#alarm-sounds');

// Create timepicker.js element in alarmInput.
alarmInput.timepicker({
    'minTime': new Date(),
    'showDuration': true
});


// Check if there is a chosen alarm time from last time.
if(localStorage.alarmTime){
    alarmTime = new Date(localStorage.alarmTime);

    alarmButton.prop("disabled", false);
    alarmInput.timepicker('setTime', alarmTime);
    alarmClock.find('span').text(alarmInput.val());
}

// Check if alarm sounds are enabled
if(localStorage.alarmSounds == 'true'){
    alarmSoundsButton.prop('checked', true);
}

// Check if the clock was running when previous session ended.
if(localStorage.alarmOn == 'true'){
    turnAlarmOn();
}

// On entering a new time, check for validity and enable/disable turning the clock on.
alarmInput.on('change', function () {

    alarmTime = alarmInput.timepicker('getTime', new Date());

    if(alarmTime){
        alarmButton.prop("disabled", false);
        alarmClock.find('span').text(alarmInput.val());
        localStorage.alarmTime = alarmTime;
    }
    else {
        alarmButton.prop("disabled", true);
        alarmClock.find('span').text('Not Set');
        localStorage.removeItem('alarmTime');
    }

});

// Turn off/on from the switch.
alarmButton.on('click',function(e){

    if($(this).prop('checked')){
        turnAlarmOn();
    }
    else{
        turnAlarmOff();
    }

});


// Turn off/on from the clock.
alarmClock.on('click', function () {
    if(alarmClock.hasClass('inactive')){
        if(alarmTime){
            turnAlarmOn();
        }
    }
    else{
        turnAlarmOff();
    }

});

function turnAlarmOn() {

    // Prevent setting multiple intervals
    clearInterval(alarmInterval);

    localStorage.alarmOn = true;

    var hours = alarmTime.getHours(),
        minutes = alarmTime.getMinutes(),
        date,
        currentHours,
        currentMin;

    // Start an interval that checks every 1000ms (1 second) if the current time is equal to the chosen one.
    alarmInterval = setInterval(function () {

        date = new Date();
        currentHours = date.getHours();
        currentMin = date.getMinutes();

        if (hours == currentHours && minutes == currentMin) {
            if(localStorage.alarmSounds == 'true'){
                alarmSound.play();
            }

            $('#times-up-modal').openModal();

            turnAlarmOff();
        }
    }, 1000);

    alarmClock.removeClass('inactive');
    alarmInput.prop('disabled', true);
    alarmButton.prop('checked', true);

}

function turnAlarmOff() {

    // Stop the interval.
    clearInterval(alarmInterval);

    localStorage.alarmOn = false;

    alarmClock.addClass('inactive');
    alarmInput.prop('disabled', false);
    alarmButton.prop('checked', false);
}

// Alarm sounds button

alarmSoundsButton.on('change', function () {
    localStorage.alarmSounds = this.checked;
});

// Dismissing alarm sounds from the modal.

$('.dismiss-alarm-sounds').on('click', function(){
    alarmSound.pause();
    alarmSound.currentTime = 0;

    $('#times-up-modal').closeModal();
});
// Stopwatch
var stopwatchInterval = 0;      // The interval for our loop.

var stopwatchClock = $(".container.stopwatch").find(".clock"),
    stopwatchDigits = stopwatchClock.find('span');

// Checks if the previous session was ended while the stopwatch was running.
// If so start it again with according time.
if(Number(localStorage.stopwatchBeginingTimestamp) && Number(localStorage.stopwatchRunningTime)){

    var runningTime = Number(localStorage.stopwatchRunningTime) + new Date().getTime() - Number(localStorage.stopwatchBeginingTimestamp);

    localStorage.stopwatchRunningTime = runningTime;

    startStopwatch();
}

// If there is any running time form previous session, write it on the clock.
// If there isn't initialise to 0.
if(localStorage.stopwatchRunningTime){
    stopwatchDigits.text(returnFormattedToMilliseconds(Number(localStorage.stopwatchRunningTime)));
}
else{
    localStorage.stopwatchRunningTime = 0;
}

$('#stopwatch-btn-start').on('click',function(){
    if(stopwatchClock.hasClass('inactive')){
        startStopwatch()
    }
});

$('#stopwatch-btn-pause').on('click',function(){
    pauseStopwatch();
});

$('#stopwatch-btn-reset').on('click',function(){
    resetStopwatch();
});

// Pressing the clock will pause/unpause the stopwatch.
stopwatchClock.on('click',function(){

    if(stopwatchClock.hasClass('inactive')){
        startStopwatch()
    }
    else{
        pauseStopwatch();
    }
});

function startStopwatch(){
    // Prevent multiple intervals going on at the same time.
    clearInterval(stopwatchInterval);

    var startTimestamp = new Date().getTime(),
        runningTime = 0;

    localStorage.stopwatchBeginingTimestamp = startTimestamp;

    // The app remembers for how long the previous session was running.
    if(Number(localStorage.stopwatchRunningTime)){
        runningTime = Number(localStorage.stopwatchRunningTime);
    }
    else{
        localStorage.stopwatchRunningTime = 1;
    }

    // Every 100ms recalculate the running time, the formula is:
    // time = now - when you last started the clock + the previous running time

    stopwatchInterval = setInterval(function () {
        var stopwatchTime = (new Date().getTime() - startTimestamp + runningTime);

        stopwatchDigits.text(returnFormattedToMilliseconds(stopwatchTime));
    }, 100);

    stopwatchClock.removeClass('inactive');
}

function pauseStopwatch(){
    // Stop the interval.
    clearInterval(stopwatchInterval);

    if(Number(localStorage.stopwatchBeginingTimestamp)){

        // On pause recalculate the running time.
        // new running time = previous running time + now - the last time we started the clock.
        var runningTime = Number(localStorage.stopwatchRunningTime) + new Date().getTime() - Number(localStorage.stopwatchBeginingTimestamp);

        localStorage.stopwatchBeginingTimestamp = 0;
        localStorage.stopwatchRunningTime = runningTime;

        stopwatchClock.addClass('inactive');
    }
}

// Reset everything.
function resetStopwatch(){
    clearInterval(stopwatchInterval);

    stopwatchDigits.text(returnFormattedToMilliseconds(0));
    localStorage.stopwatchBeginingTimestamp = 0;
    localStorage.stopwatchRunningTime = 0;

    stopwatchClock.addClass('inactive');
}


function returnFormattedToMilliseconds(time){
    var milliseconds = Math.floor((time % 1000) / 100),
        seconds = Math.floor((time/1000) % 60),
        minutes = Math.floor((time/(1000*60)) % 60),
        hours = Math.floor((time/(1000*60*60)) % 24);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;


    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
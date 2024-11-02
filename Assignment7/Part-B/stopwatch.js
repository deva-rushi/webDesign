// JavaScript code
var sec = 0;
var min = 0;
var hours = 0;
var timer = document.getElementById('timer');
var watch = null;
var ms = 0;

const start = document.getElementById('start');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');

async function startTimer() {
    if (watch !== null) {
        clearInterval(watch);
    }
    return new Promise((resolve) => {
        watch = setInterval(() => {
            updateTimer();
        }, 1000);
        resolve();
    });
}

async function pauseTimer() {
    clearInterval(watch);
    return Promise.resolve();
}

async function resetTimer() {
    sec = 0;
    min = 0;
    hours = 0;
    timer.innerHTML = '00 : 00 : 00';
    clearInterval(watch);
    return Promise.resolve();
}

function updateTimer() {
    sec++;
    if (sec == 60) {
        sec = 0;
        min++;
        if (min == 60) {
            min = 0;
            hours++;
            if (hours == 24) {
                min = sec = hours = 0;
            }
        }
    }

    var h = hours < 10 ? '0' + hours : hours;
    var m = min < 10 ? '0' + min : min;
    var s = sec < 10 ? '0' + sec : sec;

    timer.innerHTML = `${h} : ${m} : ${s}`;
}

start.addEventListener('click', async () => {
    await startTimer();
});

pause.addEventListener('click', async () => {
    await pauseTimer();
});

reset.addEventListener('click', async () => {
    await resetTimer();
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the date input element
    var dateInput = document.getElementById('date');

    // Create a new Date object for the current date
    var currentDate = new Date();

    // Format the date as 'YYYY-MM-DD'
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var formattedDate = `${year}-${month}-${day}`;

    // Set the value of the date input to the current date
    dateInput.value = formattedDate;
});

// Get all the HTML elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const lapList = document.getElementById('lapList');
const toggleTheme = document.getElementById('toggleTheme');

// Variables to track time
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let intervalId = null; 
let isRunning = false; 
let lapCounter = 1; 

// Function to format time"
function formatTime(num) {
return num < 10 ? '0' + num : num;
}

function formatMilliseconds(num) {
if (num < 10) return '00' + num;
if (num < 100) return '0' + num;
return num;
}

// Function to update display
function updateDisplay() {
// Create the time string with milliseconds 
display.textContent =
formatTime(hours) + ':' +
formatTime(minutes) + ':' +
formatTime(seconds) + '.' +
formatMilliseconds(milliseconds);
}

// Start stopwatch function
function startStopwatch() {
// Only start if not already running
if (!isRunning) {
isRunning = true;

// Run code every 10 milliseconds
intervalId = setInterval(function() {
milliseconds += 10; // Add 10 milliseconds each time

// When milliseconds reach 1000, that's 1 second
if (milliseconds === 1000) {
milliseconds = 0;
seconds++;
}

// When seconds reach 60, that's 1 minute
if (seconds === 60) {
seconds = 0;
minutes++;
}

// When minutes reach 60, that's 1 hour
if (minutes === 60) {
minutes = 0;
hours++;
}

// Update the display to show new time
updateDisplay();
}, 10); // Run every 10 milliseconds for accuracy
}
}

// Stop stopwatch function
function stopStopwatch() {
if (isRunning) {
clearInterval(intervalId); // Stops the interval
isRunning = false;
}
}

// Reset stopwatch function
function resetStopwatch() {
clearInterval(intervalId); // Stop the timer
isRunning = false;

// Reset all time variables back to 0
hours = 0;
minutes = 0;
seconds = 0;
milliseconds = 0;

// Reset lap counter
lapCounter = 1;

// Clear all recorded laps from the list
lapList.innerHTML = '';

// Update display to show 00:00:00.000
updateDisplay();
}

// A lap is used to track progress at different points
function recordLap() {
// Only record lap if stopwatch is running
if (isRunning) {
// Get current time as a string
const lapTime =
formatTime(hours) + ':' +
formatTime(minutes) + ':' +
formatTime(seconds) + '.' +
formatMilliseconds(milliseconds);

// Create a new list item element
const lapItem = document.createElement('li');

// Set the content: "Lap 1" on left, time on right
lapItem.innerHTML =
'<span>Lap ' + lapCounter + '</span><span>' + lapTime + '</span>';

// Add the lap item to the top of the list
lapList.insertBefore(lapItem, lapList.firstChild);

// Increase lap counter for next lap
lapCounter++;
}
}

// STEP 9: Toggle theme function 
function toggleThemeMode() {
const body = document.body;

// Switch between light and dark theme
if (body.classList.contains('light-theme')) {
body.classList.remove('light-theme');
body.classList.add('dark-theme');
toggleTheme.textContent = '☀️ Switch Theme';
} else {
body.classList.remove('dark-theme');
body.classList.add('light-theme');
toggleTheme.textContent = '🌙 Switch Theme';
}
}

// When buttons are clicked, run the corresponding function
startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
toggleTheme.addEventListener('click', toggleThemeMode);


document.addEventListener('keydown', function(event) {
// Space bar = Start/Stop
if (event.code === 'Space') {
event.preventDefault(); // Prevent page scroll
if (isRunning) {
stopStopwatch();
} else {
startStopwatch();
}
}
// 'R' key = Reset
if (event.code === 'KeyR') {
resetStopwatch();
}
// 'L' key = Lap
if (event.code === 'KeyL') {
recordLap();
}
});
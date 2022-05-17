const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');

const infoBtn = document.querySelector('.info');
const modalShadow = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');

let countTime;
let minutes = 0;
let seconds = 0;

let timesArr = [];
//array to stack outcome of stopper

const handleStart = () => {
	clearInterval(countTime);
	//clearInterval in this place does not allow to click start over and over again , function is set only for one time

	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++;
			stopwatch.textContent = `${minutes}:0${seconds}`;

			//adding seconds i second place
		} else if (seconds >= 9 && seconds < 59) {
			seconds++;
			stopwatch.textContent = `${minutes}:${seconds}`;

			//adding seconds in first adn second place
		} else {
			minutes++;
			seconds = 0;
			stopwatch.textContent = `${minutes}:00`;

			//setting minutes and clearing the seconds part
		}
	}, 100);
	//time that must pass to add the second number in 'ms
};

const clearStuff = () => {
	clearInterval(countTime);
	stopwatch.textContent = '0:00';
	timeList.textContent = '';
	seconds = 0;
	minutes = 0;

	//setting minutes and seconds to 0:00
};

const handleStop = () => {
	time.innerHTML = `last time: : ${stopwatch.textContent}`;

	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible';
		timesArr.push(stopwatch.textContent);
		console.log(timesArr);
		//pushing outcome of stopper to array
	} else {
		time.style = 'none';
	}
	clearStuff();
};

const handlePause = () => {
	clearInterval(countTime);
	//function that handle stopping of the time
};

const handleReset = () => {
	clearStuff();
	time.style = 'none';
	timesArr = [];
	//cleaning outcome stacking in arrray
};

const showHistory = () => {
	timeList.textContent = '';
	let num = 1;
	timesArr.forEach((time) => {
		const newTime = document.createElement('li');
		newTime.innerHTML = `Outcome number ${num} : <span>${time}</span>`;
		timeList.appendChild(newTime);
		//adding outcome to archive and adding li to ul
		num++;
	});
};

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block';
	} else {
		modalShadow.style.display = 'none';
	}

	modalShadow.classList.toggle('modal-animation');
};

startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);
historyBtn.addEventListener('click', showHistory);
infoBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', showModal);
window.addEventListener('click', e => e.target === modalShadow ? showModal() :false);
//checking if we click in modalShadow 

window.addEventListener('DOMContentLoaded', function() {

	let tab = require('../parts/tab.js');
	//let timer = require('../parts/timer.js');
	let scroll = require('../parts/scroll.js');
	let modal = require('../parts/modal.js');
	let ajax = require('../parts/ajax.js');
	let slider = require('../parts/slider.js');
	let calc = require('../parts/calc.js');

	tab();
	//timer();
	scroll();
	modal();
	ajax();
	slider();
	calc();

	let deadline = '2018-04-22';

	function getTimeRemainng(endTime) {
		let t = Date.parse(endTime) - Date.parse(new Date()),
		seconds = Math.floor((t/1000) % 60),
		minutes = Math.floor((t/1000/60) % 60),
		hours = Math.floor(t/(1000*60*60)),
		days = Math.floor(hours/24);

		return {
			'total': t,
			'days' : days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(id, endTime) {
		let timer = document.getElementById(id),
		days = timer.querySelector('.days'),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds'),
			t_days = timer.querySelector('.t-days'), //titles
			t_hours = timer.querySelector('.t-hours'),
			t_minutes = timer.querySelector('.t-minutes'),
			t_seconds = timer.querySelector('.t-seconds');

			let arr_1 = [0,5,6,7,8,9],
			arr_2 = [2,3,4];

			function updateClock() {
				let t = getTimeRemainng(endTime),
				a = t.days * 24,
				mod_hours = t.hours - a;

				if (t.hours <= 0 && t.minutes <= 0 && t.seconds <= 0) {
					days.innerHTML = '0';
					hours.innerHTML = '00';
					minutes.innerHTML = '00';
					seconds.innerHTML = '00';
				} else if (t.minutes < 10) {
					minutes.innerHTML = `0${t.minutes}`;
				} else if (t.seconds < 10) {
					seconds.innerHTML = `0${t.seconds}`;
				} else {
					days.innerHTML = t.days;
					hours.innerHTML = mod_hours;
					minutes.innerHTML = t.minutes;
					seconds.innerHTML = t.seconds;
				}
				let lastIntDays = t.days % 10,
				lastIntHours = mod_hours % 10,
				lastIntMinutes = t.minutes % 10,
				lastIntSeconds = t.seconds % 10;
				
				for (let i = 0; i < arr_2.length; i++) {
					if (lastIntSeconds == arr_2[i]) {
						t_seconds.innerHTML = 'Секунды';
					} else if (lastIntSeconds == 1) {
						t_seconds.innerHTML = 'Секунда';
					} else {
						for (let j = 0; j < arr_1.length; j++) {
							if (lastIntSeconds == arr_1[i]) {
								t_seconds.innerHTML = 'Секунд';
							}
						}
					}
				}

				for (let i = 0; i < arr_2.length; i++) {
					if (lastIntMinutes == arr_2[i]) {
						t_minutes.innerHTML = 'Минуты';
					} else if (lastIntMinutes == 1) {
						t_minutes.innerHTML = 'Минута';
					} else {
						for (let j = 0; j < arr_1.length; j++) {
							if (lastIntMinutes == arr_1[i]) {
								t_minutes.innerHTML = 'Минут';
							}
						}
					}
				}

				for (let i = 0; i < arr_2.length; i++) {
					if (lastIntHours == arr_2[i]) {
						t_hours.innerHTML = 'Часа';
					} else if (lastIntHours == 1) {
						t_hours.innerHTML = 'Час';
					} else {
						for (let j = 0; j < arr_1.length; j++) {
							if (lastIntHours == arr_1[i]) {
								t_hours.innerHTML = 'Часов';
							}
						}
					}
				}

				for (let i = 0; i < arr_2.length; i++) {
					if (lastIntDays == arr_2[i]) {
						t_days.innerHTML = 'Дня';
					} else if (lastIntDays == 1) {
						t_days.innerHTML = 'День';
					} else {
						for (let j = 0; j < arr_1.length; j++) {
							if (lastIntDays == arr_1[i]) {
								t_days.innerHTML = 'Дней';
							}
						}
					}
				}

				if (t.total <= 0) {
					clearInterval(timeInterval);
				}
			}
			updateClock();
			let timeInterval = setInterval(updateClock, 1000);
		}

		setClock('timer', deadline);
	});

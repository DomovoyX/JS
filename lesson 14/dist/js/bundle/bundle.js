(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/scroll.js":5,"../parts/slider.js":6,"../parts/tab.js":7}],2:[function(require,module,exports){
function ajax() {
	
	let message = new Object();
	message.loading = 'Загрузка';
	message.success = 'Спасибо!';
	message.failure = 'Ошибка';

	let modal_form = document.getElementsByClassName('main-form')[0],
		form = document.getElementById('form'),
		modal_input = modal_form.getElementsByTagName('input'),
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

	statusMessage.classList.add('status');

// modal window form

	modal_form.addEventListener('submit', function (event) {
		event.preventDefault();
		document.body.appendChild(statusMessage);

		// AJAX
		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');

		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		let formData = new FormData(modal_form);

		request.send(formData);

		request.onreadystatechange = function () {
			if(request.readyState < 4) {
				statusMessage.classList.add('status_loading');
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.classList.add('status_success');
				}
				else {
					statusMessage.classList.add('status_failure');
				}
			}
		}
		for (let i = 0; i < modal_input.length; i++) {
			modal_input[i].value = '';
		}
	});

// page form

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		form.appendChild(statusMessage);

		// AJAX
		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');

		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		let formData = new FormData(form);

		request.send(formData);

		request.onreadystatechange = function () {
			if(request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
				}
				else {
					statusMessage.innerHTML = message.failure;
				}
			}
		}
		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}
	});
}

module.exports = ajax;
},{}],3:[function(require,module,exports){
function calc() {
	
	let persons = document.getElementsByClassName('counter-block-input')[0],
	restDays = document.getElementsByClassName('counter-block-input')[1],
	place = document.getElementById('select'),
	totalValue = document.getElementById('total'),
	personsSum = 0,
	daysSum = 0,
	total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('input', function () {
		personsSum = +this.value;
		total = (daysSum + personsSum) * 4000;
		if (restDays.value == '' || restDays.value < 1 || persons.value < 1) {
			totalValue.innerHTML = 0;
			place.style.display = 'none';
			persons.style.color = 'orange';
		} else {
			persons.style.color = 'green';
			place.style.display = 'block';
			totalValue.innerHTML = total;
		}
	});
	restDays.addEventListener('input', function () {
		daysSum = +this.value;
		total = (daysSum + personsSum) * 4000;
		if (persons.value == '' || persons.value < 1 || restDays.value < 1) {
			totalValue.innerHTML = 0;
			place.style.display = 'none';
			restDays.style.color = 'orange';
		} else {
			place.style.display = 'block';
			restDays.style.color = 'green';
			totalValue.innerHTML = total;
		}
	});

	place.addEventListener('change', function () {
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});
}

module.exports = calc;
},{}],4:[function(require,module,exports){
function modal() {
	let more = document.querySelector('.more'),
	overlay = document.querySelector('.overlay'),
	close = document.querySelector('.popup-close'),
	infoContent = document.getElementsByClassName('info')[0];

	more.addEventListener('click', function() {
		this.classList.add('more-splash');
		overlay.style.display = 'block';
		//отключаем прокрутку при открытии модального окна
		document.body.style.overflow = 'hidden';
	});
	close.addEventListener('click', function() {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});
	infoContent.addEventListener('click', function() {
		let target = event.target;


		if (target.className === 'description-btn') {
			overlay.style.display = 'block';
			document.body.style.overflow = 'hidden';
		}
	});
}

module.exports = modal;
},{}],5:[function(require,module,exports){
function slowScroll() {
	
	function animate(draw, duration) {
		let start = performance.now();
		requestAnimationFrame(function animate(time) {
			let timePassed = time - start;
			if (timePassed > duration) {
				timePassed = duration;
			}

			draw(timePassed);

			if (timePassed < duration) {
				requestAnimationFrame(animate);
			}
		});
	}

	let menu = document.getElementsByTagName('nav')[0];

	menu.addEventListener('click', function (event) {
		event.preventDefault();
		animate(function (timePassed) {
			let target = event.target;
			let section = document.getElementById(target.getAttribute('href').slice(1));
			window.scrollBy(0, section.getBoundingClientRect().top / 20 - 3);
		}, 1500);
	});
}
module.exports = slowScroll;
},{}],6:[function(require,module,exports){
function slider() {
	
	let slideIndex = 1,
		slides = document.getElementsByClassName('slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.getElementsByClassName('dot');

	showSlides(slideIndex);

	function showSlides(n) {
		
		if (n > slides.length) {
			slideIndex = 1;
		} 
		if (n < 1) {
			slideIndex = slides.length;
		}

		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		};
		for (let i = 0; i < dots.length; i++) {
			dots[i].classList.remove('dot-active'); 
		};

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');

	};

	function plusSlides(n) {
		showSlides(slideIndex += n);
	};
	function currentSlide(n) {
		showSlides(slideIndex = n);
	};

	prev.addEventListener('click', function () {
		plusSlides(-1);
	});
	next.addEventListener('click', function () {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function (event) {
		for (let i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
				currentSlide(i);
			}
		}
	});
}

module.exports = slider;
},{}],7:[function(require,module,exports){
function tab() {
	let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent'),
		info = document.getElementsByClassName('info-header')[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');

		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if(tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target.className == 'info-header-tab') {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			}
		}
	});
}

module.exports = tab;
},{}]},{},[1]);

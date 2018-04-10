//tabs

window.addEventListener('DOMContentLoaded', function() {
	
	let tab = document.getElementsByClassName('info-header-tab'),
	tabContent = document.getElementsByClassName('info-tabcontent'),
	info = document.getElementsByClassName('info-header')[0],
	infoContent = document.getElementsByClassName('info')[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
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

	// Timer

	let deadline = '2018-04-28';

	function getTimeRemainng(endTime) {
		let t = Date.parse(endTime) - Date.parse(new Date()),
		seconds = Math.floor((t/1000) % 60),
		minutes = Math.floor((t/1000/60) % 60),
		hours = Math.floor(t/(1000*60*60));

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(id, endTime) {
		let timer = document.getElementById(id),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds');

		function updateClock() {
			let t = getTimeRemainng(endTime);
			if (t.hours <= 0 && t.minutes <= 0 && t.seconds <= 0) {
				hours.innerHTML = '00';
				minutes.innerHTML = '00';
				seconds.innerHTML = '00';
			} else if (t.hours < 10) {
				hours.innerHTML = '0'+t.hours;
			} else if (t.minutes < 10) {
				minutes.innerHTML = '0'+t.minutes;
			} else if (t.seconds < 10) {
				seconds.innerHTML = '0'+t.seconds;
			} else {
				hours.innerHTML = t.hours;
				minutes.innerHTML = t.minutes;
				seconds.innerHTML = t.seconds;
			}

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
		updateClock();
		let timeInterval = setInterval(updateClock, 1000);
	}

	setClock('timer', deadline);

// собираем все якоря; устанавливаем время анимации и количество кадров
let anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
animationTime = 1000,
framesCount = 60;

anchors.forEach(function(item) {
	// каждому якорю присваиваем обработчик события
	item.addEventListener('click', function(e) {
		// убираем стандартное поведение
		e.preventDefault();
		
		// для каждого якоря берем соответствующий ему элемент и определяем его координату Y
		let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top;
		
		// запускаем интервал, в котором
		let scroller = setInterval(function() {
			// считаем на сколько скроллить за 1 такт
			let scrollBy = coordY / framesCount;
			
			// если к-во пикселей для скролла за 1 такт больше расстояния до элемента
			// и дно страницы не достигнуто
			if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
				// то скроллим на к-во пикселей, которое соответствует одному такту
				window.scrollBy(0, scrollBy);
			} else {
				// иначе добираемся до элемента и выходим из интервала
				window.scrollTo(0, coordY);
				clearInterval(scroller);
			}
		// время интервала равняется частному от времени анимации и к-ва кадров
	}, animationTime / framesCount);
	});
});

// Modal

let more = document.querySelector('.more'),
overlay = document.querySelector('.overlay'),
close = document.querySelector('.popup-close');

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
});
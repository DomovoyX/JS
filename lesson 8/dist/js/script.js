//tabs

window.addEventListener('DOMContentLoaded', function() {
	
	let tab = document.getElementsByClassName('info-header-tab'),
	tabContent = document.getElementsByClassName('info-tabcontent'),
	info = document.getElementsByClassName('info-header')[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1)

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
		};
	});

	let deadline = '2018-04-09';
	let timeDl = Date.parse(new Date()) - Date.parse(deadline);
	if (timeDl>0) {
		myTimeOut();
	} else {

			//сколько времени до дедлайна?
			function getTimeRemaining(endtime) {
				let t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor((t/1000) % 60),
				minutes = Math.floor((t/1000/60) % 60),
				hours = Math.floor(t/(1000*60*60)),
				time = {
					'total': t,
					'hours': hours,
					'minutes': minutes,
					'seconds': seconds
				};

				if (time.hours < 10) {
					time.hours = '0' + time.hours;
				};
				if (time.minutes < 10) {
					time.minutes = '0' + time.minutes;
				};
				if (time.seconds < 10) {
					time.seconds = '0' + time.seconds;
				};
				return time;

			};

			//запуск наших часов:
			function setClock (id, endTime) {
				let timer = document.getElementById(id),
				hours = timer.querySelector('.hours'),
				minutes = timer.querySelector('.minutes'),
				seconds = timer.querySelector('.seconds');

						//обновление таймера ежесекундно
						function updateClock () {
							let t = getTimeRemaining(endTime);
							//вставляем в объекты html значения свойств объекта, полученного из ф-ции getTimeRemaining
							hours.innerHTML = t.hours;
							minutes.innerHTML = t.minutes;
							seconds.innerHTML = t.seconds;
							//условие остановки таймера
							if (t.total <= 0) {
								clearTimeout(timeInterval);
							}
						};

						updateClock ();
						let timeInterval = setInterval(updateClock, 1000);
					};
					setClock ('timer', deadline)
				};
				
	//если время вышло...
	function myTimeOut(){
		let timer = document.getElementById('timer'),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds'),
		text = document.getElementsByClassName('timer-action')[0];

		hours.textContent = '00';
		minutes.textContent = '00';
		seconds.textContent = '00';
		text.textContent = 'Время вышло.';

	};

// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
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
});
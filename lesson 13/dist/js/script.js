window.addEventListener('DOMContentLoaded', function() {
//tabs	
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

//timer

	let deadline = '2018-04-21';

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

//modal

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

//form

	let message = new Object();
	message.loading = '<img src="../img/ajax-loader.gif" alt="Загрузка"> Загрузка...';
	message.seccess = '<img src="../img/success.png" alt="Пиьсмо отправлено"> Спасибо! Скоро с вами свяжемся.';
	message.failure = '<img src="../img/error.png" alt="Ошибка"> Что-то пошло не так....';

	let form = document.getElementsByClassName('main-form')[0],
			formContact = document.getElementById('form'),
			input = form.getElementsByTagName('input'),
			statusMessage = document.createElement('div');
			statusMessage.classList.add('status');

			//modalWindow
			form.addEventListener('submit', function(event) {
				//отключаем обновление страницы
				event.preventDefault();
				form.appendChild(statusMessage);

				//ajax
				let req = new XMLHttpRequest();
				req.open('POST', 'server.php');

				req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				let formData = new FormData(form); 

				req.send(formData);

				//следим за нашим запросом
				req.onreadystatechange = function() {
					if (req.readyState < 4) {
						statusMessage.innerHTML = message.loading;
					} else if (req.readyState === 4) {
						if (req.status == 200 && req.status < 300) {
							statusMessage.innerHTML = message.seccess;
							//добавляем контент на страницу
						} else {
							statusMessage.innnerH	= message.failure;
						}
					}
				}
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
					//очищаем поля ввода
				}
			});

			//formContact
			formContact.addEventListener('submit', function(event) {
				event.preventDefault();
				formContact.appendChild(statusMessage);

				//ajax
				let req = new XMLHttpRequest();
				req.open('POST', 'server.php');

				req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				let formData = new FormData(form); 

				req.send(formData);

				//следим за нашим запросом
				req.onreadystatechange = function() {
					if (req.readyState < 4) {
						statusMessage.innerHTML = message.loading;
					} else if (req.readyState === 4) {
						if (req.status == 200 && req.status < 300) {
							statusMessage.innerHTML = message.seccess;
							//добавляем контент на страницу
						} else {
							statusMessage.innnerH	= message.failure;
						}
					}
				}
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
					//очищаем поля ввода
				}
			});
			console.log(formContact);

	// slider

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

	// Calc

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
});
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
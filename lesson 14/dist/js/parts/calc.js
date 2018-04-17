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
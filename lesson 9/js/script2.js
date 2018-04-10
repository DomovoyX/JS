let userName = document.getElementById('name'),
	userSurname = document.getElementById('surname'),
	userAge = document.getElementById('age'),
	btn = document.getElementById('btn');

function User(name, surname, age) {
	this.name = name;
	this.surname = surname;
	this.age = age;
};


btn.addEventListener('click', function () {
	let userData = new User(userName.value, userSurname.value, userAge.value);
	alert("Пользователь " + userData.surname + " " + userData.name + ", его возраст " + userData.age);
});
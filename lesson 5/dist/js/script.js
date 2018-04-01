let mainMenu = document.getElementsByClassName('menu'),
menuItem = document.getElementsByClassName('menu-item'),
adv 		 = document.getElementsByClassName('adv'),
li 			 = document.createElement('li'),
title		 = document.getElementById('title'),
info 		 = document.getElementById('prompt');

document.body.style.background = 'url(img/apple_true.jpg)';
document.body.style.height = '100vh';
li.textContent = 'Пятый пункт';
li.classList.add('menu-item');
mainMenu[0].appendChild(li);
mainMenu[0].insertBefore(menuItem[2], menuItem[1]);
title.textContent = 'Мы продаем только подлинную технику Apple';
adv[0].remove();

for (let i = 0; i < 1; i++) {
	let text = prompt('Как вы относитесь к технике Apple?', '');
	if ((typeof(text)) === 'string' && text !== 'null' && text !== '' && text.length < 255){
		info.textContent = text;
	}else{
		i--;
		console.log('неверный ввод данных.');
	}
};


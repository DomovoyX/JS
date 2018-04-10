class options {
	constructor(height, width, bg, fontSize, textAlign) {
		this.height = height;
		this.width = width;
		this.backgroundColor = bg;
		this.fontSize = fontSize;
		this.textAlign = textAlign;
	}

	createElement() {
		document.write(`<div id='box'>${divText.value}</div>`);
		let box = document.getElementById('box');
		box.style.cssText = `height: ${this.height};
							 width: ${this.width};
							 background-color: ${this.backgroundColor}; 
							 font-size: ${this.fontSize}; 
							 text-align: ${this.textAlign};`;
	}
}
let divText = document.getElementById('div-text'),
	btn = document.getElementsByTagName('button')[0];

const divBox = new options('100px', '100px', 'green', '18px', 'center');

btn.addEventListener('click', function() {
	divBox.createElement();
});
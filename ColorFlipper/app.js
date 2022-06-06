const colors = ['green', 'red', 'rgba(133,122,200)', '#f15025'];

const btn = document.getElementById('btn');
const colorSpan = document.querySelector('.color');

const setColor = function () {
	// SELECTING THE RANDOM COLOR
	const randomColor = colors[Math.floor(Math.random() * colors.length)];

	document.body.style.backgroundColor = `${randomColor}`; // SETTING THE RANDOM COLOR
	colorSpan.textContent = `${randomColor}`; // SETTING THE TEXT USING THE RANDOM COLOR
};

btn.addEventListener('click', setColor);

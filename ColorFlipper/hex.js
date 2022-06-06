const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

const btnSelection = document.getElementById('btn');
const color = document.querySelector('.color');

const getRandomNumber = function (arr) {
	return Math.floor(Math.random() * arr.length);
};

btnSelection.addEventListener('click', function () {
	let hexVal = '#';
	for (let i = 0; i <= 5; i++) {
		const randomNo = hex[getRandomNumber(hex)];
		hexVal += `${randomNo}`;
	}

	color.textContent = hexVal;
	document.body.style.backgroundColor = `${hexVal}`;
});

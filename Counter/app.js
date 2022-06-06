const btnIncrease = document.querySelector('.increase');
const btnDecrease = document.querySelector('.decrease');
const btnReset = document.querySelector('.reset');
const numberSelection = document.getElementById('value');

let count = 0;

// ! METHOD 1
const value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const styles = e.currentTarget.classList;

		if (styles.contains('decrease')) {
			count--;
		} else if (styles.contains('increase')) {
			count++;
		} else {
			count = 0;
		}
		value.textContent = count;

		const colorSet = count > 0 ? '#00FF00' : count < 0 ? '#FF0000' : '#102a42';

		value.style.color = `${colorSet}`;
	});
});

// ! METHOD 2 SELECTING EVERY SINGLE BUTTON AND MANUALLY ADDING
// btnIncrease.addEventListener('click', function (e) {
// 	let numberSelectionVal = Number.parseInt(numberSelection.textContent);
// 	numberSelection.textContent = `${(numberSelectionVal += 1)}`;
// 	if (numberSelectionVal > 0) {
// 		numberSelection.style.color = 'green';
// 	} else if (numberSelectionVal === 0) {
// 		numberSelection.style.color = '#102a42';
// 	}
// });

// btnDecrease.addEventListener('click', function (e) {
// 	let numberSelectionVal = Number.parseInt(numberSelection.textContent);
// 	numberSelection.textContent = `${(numberSelectionVal -= 1)}`;
// 	if (numberSelectionVal < 0) {
// 		numberSelection.style.color = 'red';
// 	} else if (numberSelectionVal === 0) {
// 		numberSelection.style.color = '#102a42';
// 	}
// });

// btnReset.addEventListener('click', function (e) {
// 	let numberSelectionVal = Number.parseInt(numberSelection.textContent);
// 	numberSelection.textContent = `0`;
// 	numberSelection.style.color = '#102a42';
// });

const gameBoard = document.getElementById('gameBoard');

const POLE_SPEED = 100;
const windowWidth = window.innerWidth;



// Start the game
document.addEventListener('click', startGame);

function startGame() {
	poleSlider();
}


// Slides the poles to the left
function poleSlider() {
	setInterval(() => {
		// Create a pole
		const pole = document.createElement('div');
		pole.className = 'pole';
		pole.style.left = '100%'; // Start at the right

		// Append the pole
		gameBoard.append(pole);

		// Move the pole left using CSS
		setTimeout(() => {
		    pole.style.left = '0%'; // Move off-screen
		}, 10);

		// Remove pole after animation
		if (pole.getBoundingClientRect().right < windowWidth) {
			console.log(pole.getBoundingClientRect().right);
		}

	}, 1111);
}
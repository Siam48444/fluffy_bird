const gameBoard = document.getElementById('gameBoard');

const POLE_SPEED = 500;
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
		const poleWidth = pole.offsetWidth;
		
		// Start at the right
		pole.style.left = '101%'; 
		pole.style.transition = `left ${POLE_SPEED} linear`;

		// Append the pole
		gameBoard.append(pole);

		// Move the pole left using CSS
		setTimeout(() => {
		    pole.style.left = `${-0}px`; // Move off-screen
		}, 10);

		// Remove pole after animation
		if (pole.getBoundingClientRect().right < windowWidth) {
			console.log(pole.getBoundingClientRect().right);
		}

	}, 500);
}
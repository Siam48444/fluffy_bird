const gameBoard = document.getElementById('gameBoard');


const windowWidth = window.innerWidth;

const POLE_SPEED = 2500;
const POLE_INTERVAL_SPEED = 1000;


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
		pole.style.left = '101%'; // Start at the right 

		// Append the pole
		gameBoard.append(pole);

		// Move the pole left using CSS
		requestAnimationFrame(() => {
            pole.style.transition = `left ${POLE_SPEED}ms linear`;
            pole.style.left = '0px'; // Move off-screen
        });

		// Remove the pole after it exits the screen
        setTimeout(() => {
            pole.remove();
        }, POLE_SPEED - 500);

	}, POLE_INTERVAL_SPEED);
}
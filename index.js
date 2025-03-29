const gameBoard = document.getElementById('gameBoard');




// Start the game
document.addEventListener('click', startGame);

function startGame() {
	poleSlider();
}


// Slides the poles to the left
function poleSlider() {
	const POLE_SPEED = 100;

	setInterval(() => {
		// Create a pole
		const pole = document.createElement('div');
		pole.className = 'pole';
		pole.style.left = '100%'; // Start at the right

		gameBoard.append(pole);

		// Move the pole left using CSS
		setTimeout(() => {
		    pole.style.transition = 'left 3s linear';
		    pole.style.left = '-50px'; // Move off-screen
		}, 10);

		// Remove pole after animation
		setTimeout(() => {
		    pole.remove();
		}, 3000);

	}, POLE_SPEED);
}
const gameBoard = document.getElementById('gameBoard');




// Start the game
document.addEventListener('click', startGame);

function startGame() {
	poleSlider();
}


// Slides the poles to the left
function poleSlider() {
	const POLE_SPEED = 100;

	setTimeout(() => {
		// Create a pole
		const pole = document.createElement('div');
		pole.className = 'pole';

		// Append the poles
		gameBoard.append(pole);
	}, 5);
}
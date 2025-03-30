// board
const BOARD = {
	width : window.innerWidth,
	height : window.innerHeight,
}

// bird
const BIRD = {
	width : 50,
	height : 50,
	x : BOARD.width / 5,
	y : BOARD.height / 2.2,
}



window.onload = () => {
	const board = document.getElementById('board');
	const context = board.getContext('2d'); // used for 2d drawing on the board

	// set the game board dimensions
	board.width = BOARD.width;
	board.height = BOARD.height;

	// draw the fluffy bird
	// context.fillStyle = 'red';
	// context.fillRect(BIRD.x, BIRD.y, BIRD.width, BIRD.height);

	const birdImage = new Image();
	birdImage.src = './assets/images/bird.png';
	
	birdImage.onload = () => {
		context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height);
	}
}
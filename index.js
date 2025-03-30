// board
let board;
let context;

const BOARD = {
	width : window.innerWidth,
	height : window.innerHeight,
}


// bird
let birdImage;

const BIRD = {
	width : 50,
	height : 50,
	x : BOARD.width / 5,
	y : BOARD.height / 2.2,
}



window.onload = () => {
	board = document.getElementById('board');
	context = board.getContext('2d'); // used for 2d drawing on the board

	// set the game board dimensions
	board.width = BOARD.width;
	board.height = BOARD.height;

	// draw the fluffy bird
	birdImage = new Image();
	birdImage.src = './assets/images/bird.png';
	
	birdImage.onload = () => {
		context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height);
	}

	requestAnimationFrame(update);
}	


function update() {


	requestAnimationFrame(update);
}
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

// pipes
let topPipeImage;
let bottomPipeImage;

const PIPE = {
	width : 50,
	height : BOARD.height / 2,
	x : BOARD.width,
	y : 0, 
}

// physics
const gravity = 4;



window.onload = () => {
	board = document.getElementById('board');
	context = board.getContext('2d'); // used for 2d drawing on the board

	// set the game board dimensions
	board.width = BOARD.width;
	board.height = BOARD.height;

	// draw the fluffy bird
	birdImage = new Image();
	birdImage.src = './assets/images/bird.png';
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height);

	// draw pipes
	// topPipeImage = new Image();
	// topPipeImage.src = './assets/images/topPipe.png';
	context.fillStyle = 'red';
	context.fillRect(PIPE.x, PIPE.y, PIPE.width, PIPE.height);

	setInterval(placePipes, 2000);
	requestAnimationFrame(update);
}	


function update() {
	context.clearRect(0, 0, board.width, board.height); // Clear previous frame

	BIRD.y += gravity; // Move bird down
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height);

	PIPE.x -= gravity;
	context.fillRect(PIPE.x, PIPE.y, PIPE.width, PIPE.height);

	requestAnimationFrame(update); // loop the animation
}


function placePipes() {

}
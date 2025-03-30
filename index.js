// board
let board, context;
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
let topPipeImage, bottomPipeImage;


// physics
const gravity = 2;
const pipeVelocity = -3;
const birdVelocity = -2;




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

	// draw top pipe
	topPipeImage = new Image();
	topPipeImage.src = './assets/images/topPipe.png';

	// draw bottom pipe
	bottomPipeImage = new Image();
	bottomPipeImage.src = './assets/images/bottomPipe.png';


	setInterval(placePipes, 2000);
	requestAnimationFrame(update);
}	


function update() {
	context.clearRect(0, 0, board.width, board.height); // Clear previous frame

	//draw bird
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); 

	//draw pipes
	TOP_PIPE.x += pipeVelocity;
	BOTTOM_PIPE.x += pipeVelocity;

	context.drawImage(topPipeImage, TOP_PIPE.x, TOP_PIPE.y, TOP_PIPE.width, TOP_PIPE.height); //draw top pipe
	context.drawImage(bottomPipeImage, BOTTOM_PIPE.x, BOTTOM_PIPE.y, BOTTOM_PIPE.width, BOTTOM_PIPE.height); //draw bottom pipe

	requestAnimationFrame(update); // loop the animation
}


function placePipes() {
	let TOP_PIPE = {
		width : BIRD.width * 2,
		height : BOARD.height / 1.7,
		x : BOARD.width,
		y : 0, 
	}

	let BOTTOM_PIPE = {
		width : TOP_PIPE.width,
		height : BOARD.height / 1.7,
		x : BOARD.width,
		y : BOARD.height, 
	}
}
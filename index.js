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
const PIPE = {
	width : BIRD.width * 1.5,
	height : BOARD.height / 1.7,
	x : BOARD.width - 500,
	y : 0, 
}


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
	PIPE.x += pipeVelocity;
	context.drawImage(topPipeImage, PIPE.x, PIPE.y, PIPE.width, PIPE.height); //draw top pipe
	// context.drawImage(bottomPipeImage, PIPE.x, PIPE.y, PIPE.width, PIPE.height); //draw bottom pipe

	requestAnimationFrame(update); // loop the animation
}


function placePipes() {
	
}
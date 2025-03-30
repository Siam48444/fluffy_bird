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
let pipeArray = [];
const pipeInterval = 500; // in milliseconds


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

	// draw the top pipe
	topPipeImage = new Image();
	topPipeImage.src = './assets/images/topPipe.png';

	// draw the bottom pipe
	bottomPipeImage = new Image();
	bottomPipeImage.src = './assets/images/bottomPipe.png';

	setInterval(placePipes, pipeInterval);
	requestAnimationFrame(update);
}	


function update() {
	context.clearRect(0, 0, board.width, board.height); // Clear previous frame

	//draw bird
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); 

	//draw pipes
	for (let pipe of pipeArray) {
		pipe.x += pipeVelocity;
		context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height);
	}

	// loop the animation
	requestAnimationFrame(update); 
}


function placePipes() {
	let randomPipeY = BOARD.height * Math.random();

	let topPipe = {
		image : topPipeImage, 
		width : BIRD.width * 2,
		height : BOARD.height / 1.7,
		x : BOARD.width,
		y : -randomPipeY, 
	}
	pipeArray.push(topPipe);

	// let bottomPipe = {
	// 	width : TOP_PIPE.width,
	// 	height : BOARD.height / 1.7,
	// 	x : BOARD.width,
	// 	y : BOARD.height, 
	// }
}
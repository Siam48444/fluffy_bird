// the game board
const board = document.getElementById('board');
const context = board.getContext('2d'); // used for 2d drawing on the board

// set the game board dimensions
board.width = BOARD.width;
board.height = BOARD.height;

const BOARD = {
	width : window.innerWidth,
	height : window.innerHeight,
}


// bird
const birdImage = new Image(); // draw the fluffy bird
birdImage.src = './assets/images/bird.png';
context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height);

const BIRD = {
	width : 50,
	height : 50,
	x : BOARD.width / 5,
	y : BOARD.height / 2.2,
}


// pipes
let pipeArray = [];
const pipeInterval = 1500; // in milliseconds
const pipeSpacing = BIRD.height * 5;

// draw the top pipe
const topPipeImage = new Image();
topPipeImage.src = './assets/images/topPipe.png';

// draw the bottom pipe
const bottomPipeImage = new Image();
bottomPipeImage.src = './assets/images/bottomPipe.png';

const TOP_PIPE = {
	width : BIRD.width * 2,
	height : BOARD.height / 1.7,
	x : BOARD.width,
	y : 0, 
}


// physics
const gravity = 2;
const pipeVelocity = -3;
const birdVelocity = -2;



window.onload = () => {
	

	

	

	

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
	let randomPipeY = (Math.random() * TOP_PIPE.height / 2.2);

	let topPipe = {
		width : TOP_PIPE.width,
		height : TOP_PIPE.height,
		x : TOP_PIPE.x,
		y : -randomPipeY, 
		image : topPipeImage, 
	}
	pipeArray.push(topPipe);


	let bottomPipe = {
		width : TOP_PIPE.width,
		height : TOP_PIPE.height,
		x : TOP_PIPE.x,
		y : TOP_PIPE.height + pipeSpacing - randomPipeY, 
		image : bottomPipeImage, 
	}
	pipeArray.push(bottomPipe);
}
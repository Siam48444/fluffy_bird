// board
const BOARD = {
	width : window.innerWidth,
	height : window.innerHeight,
}

const board = document.getElementById('board');
const context = board.getContext('2d'); // used for 2 dimensional drawing on the board

board.width = BOARD.width; // set the game board dimensions
board.height = BOARD.height;


// bird
const BIRD = {
	width : 50,
	height : 50,
	x : BOARD.width / 5,
	y : BOARD.height / 2.2,
}

const birdImage = new Image(); // fluffy bird image
context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); // draw the bird


// pipes
const TOP_PIPE = {
	width : BIRD.width * 2,
	height : BOARD.height / 1.7,
	x : BOARD.width + 1,
	y : 0, 
} // the bottom pipes are generated based on this object

let pipeArray = []; // used to add more pipes in the game
let pipeInterval = 1500; // in milliseconds
let pipeSpacing = BIRD.height * 5; // space between the pipes

const topPipeImage = new Image(); // top pipe images
const bottomPipeImage = new Image(); // bottom pipe images


// physics
const gravity = 2;
const pipeVelocity = -3;
const birdVelocity = -2;




window.addEventListener('DOMContentLoaded', () => {
	// load the images
	birdImage.src = './assets/images/bird.png';
	topPipeImage.src = './assets/images/topPipe.png'; 
	bottomPipeImage.src = './assets/images/bottomPipe.png';

	requestAnimationFrame(update);
	setInterval(placePipes, pipeInterval);
});


// update the frames
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


// place the pipes
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
// board
const BOARD = {
	width: window.innerWidth,
	height: window.innerHeight,
}

const board = document.getElementById('board');
const context = board.getContext('2d'); // used for 2 dimensional drawing on the board

board.width = BOARD.width; // set the game board dimensions
board.height = BOARD.height;


// bird
const BIRD = {
	width: 60,
	height: 50,
	x: BOARD.width / 5,
	y: BOARD.height / 2.2,
}

const birdImage = new Image(); // fluffy bird image
birdImage.src = './assets/images/bird.png';


// pipes
const TOP_PIPE = {
	width: BIRD.width * 2,
	height: BOARD.height / 1.7,
	x: BOARD.width + 1,
	y: 0, 
} // the bottom pipes are generated based on this object

const topPipeImage = new Image(); // pipe images
const bottomPipeImage = new Image(); 
topPipeImage.src = './assets/images/topPipe.png'; 
bottomPipeImage.src = './assets/images/bottomPipe.png';	


// physics and others
let gravity = 0.3; // gravity of the falling bird
let birdVelocity = 0; // velocity of the jumping bird (0 by default)
let pipeVelocity = -(BOARD.width / 500); // velocity of the moving pipes
let pipeArray = []; // used to add more pipes in the game
let pipeInterval = 1000; // time between each pipe generation (in milliseconds)
let pipeSpacing = BIRD.height * 5; // space between the pipes




window.addEventListener('DOMContentLoaded', () => {
	// draw the bird
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); 

	// make the bird jump
	window.addEventListener('keydown', jump);
	window.addEventListener('click', jump);

	// start the animations
	requestAnimationFrame(update);
	setInterval(placePipes, pipeInterval);
});


// update the frames
function update() {
	// Clear previous frame
	context.clearRect(0, 0, board.width, board.height); 

	//draw the bird
	BIRD.y += birdVelocity;
	birdVelocity += gravity; // update the bird velocity using the gravity
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height);

	// draw the new pipes from the pipe array
	for (let pipe of pipeArray) {
		pipe.x += pipeVelocity; // move the pipes to the left
		context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height); // draw the pipes
	}

	// loop the animation
	requestAnimationFrame(update); 
}


// place the pipes
function placePipes() {
	let randomPipeY = (Math.random() * TOP_PIPE.height / 2.2); // random Y positions for the pipes 

	// new top pipes
	let topPipe = {
		width: TOP_PIPE.width,
		height: TOP_PIPE.height,
		x: TOP_PIPE.x,
		y: -randomPipeY, // move the top pipe a little upwards for randomly 
		image: topPipeImage, 
	}
	pipeArray.push(topPipe); // add the new pipe

	// new bottom pipes
	let bottomPipe = {
		width: TOP_PIPE.width,
		height: TOP_PIPE.height,
		x: TOP_PIPE.x,
		y: TOP_PIPE.height + pipeSpacing - randomPipeY, // move the bottom pipe a little downwards randomly 
		image: bottomPipeImage, 
	}
	pipeArray.push(bottomPipe); // add the new pipe
}


// make the bird jump
function jump(e) {
	// jump rate
	const jumpRate = -6;

	// jump if any key is pressed
	if ( 
		e.code === 'Space' || 
		e.code === 'KeyW' || 
		e.code === 'ArrowUp' ||
		e.code === 'NumpadEnter' ||
		e.code === 'Enter'
	) {
		birdVelocity = jumpRate;
	}

	// jump if mouse is clicked
	else {
		birdVelocity = jumpRate;
	}
}
// board
const board = document.getElementById('board');
const context = board.getContext('2d'); 
board.height = window.innerHeight; // set the initial board dimensions 
board.width = board.height; 

window.addEventListener('DOMContentLoaded', adjustBoard); // make the board width responsive
window.addEventListener('resize', adjustBoard);


// bird
const BIRD = {};
const birdImage = new Image(); 
birdImage.src = './assets/images/bird.png';


// pipes
const TOP_PIPE = {}; // the bottom pipes are generated based on this object
const topPipeImage = new Image(); 
const bottomPipeImage = new Image(); 
topPipeImage.src = './assets/images/topPipe.png'; 
bottomPipeImage.src = './assets/images/bottomPipe.png';	


// ground
const GROUND = {};
const groundImage = new Image();
groundImage.src = './assets/images/ground.png';


// physics and others
let gravity; // gravity of the falling bird
let birdVelocity = 0; // initial velocity of the bird
let jumpVelocity; // velocity of the jumping bird

let pipeVelocity; // velocity of the moving pipes
let pipeInterval = 800; // time between each pipe generation (in milliseconds)
let pipeSpacing; // space between the pipes
let pipeArray = []; // used to add more pipes in the game

let gameOver = false; // track if the game is over


// adjust the game board and the elements
function adjustBoard() {
	// set the board's minimum width
	let minSize = Math.min(window.innerWidth, window.innerHeight);
	board.width = board.height = minSize;

	// set the board's maximum width
	let maxSize = 1111;
	if (board.width > maxSize) {
		board.width = board.height = maxSize;
	}

	// recalculate bird properties
	BIRD.width = BIRD.height = board.width * 0.06;
	BIRD.x = board.width / 5;
	BIRD.y = (board.height / 2) - (BIRD.height * 0.5);

	// update pipe properties
	TOP_PIPE.width = BIRD.width * 2;
	TOP_PIPE.height = board.height;
	TOP_PIPE.x = board.width;

	// update ground properties
	GROUND.width = board.width;
	GROUND.height = board.height * 0.2;
	GROUND.x = 0;
	GROUND.y = board.height - GROUND.height;

	// update others
	gravity = board.width * 0.0005;
	jumpVelocity = -(board.width * 0.01);
	pipeVelocity = -(board.width * 0.005);
	pipeSpacing = BIRD.height * 4.5;
}


window.addEventListener('DOMContentLoaded', () => {
	// draw the bird
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); 

	// make the bird jump
	window.addEventListener('keydown', jumpOnKeypress);
	window.addEventListener('click', () => { birdVelocity = jumpVelocity }); // jump if mouse is clicked

	// start the animations
	requestAnimationFrame(updateFrames);
	setInterval(generatePipes, pipeInterval);
});


// update the frames
function updateFrames() {
	// stop the function if the game is over
	if (gameOver) return;

	// Clear previous frame
	context.clearRect(0, 0, board.width, board.height); 

	// update the bird velocity using the gravity
	BIRD.y += birdVelocity;
	birdVelocity += gravity; 

	// prevent the bird from going outside the screen
	setBirdBoundary();

	//draw the bird
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height);

	// draw the new pipes from the pipe array
	for (let pipe of pipeArray) {
		pipe.x += pipeVelocity; // move the pipes to the left
		context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height); // draw the pipes

		// remove the old pipes that has already gone off the screen
		if (pipe.x + pipe.width < -board.width) {
			pipeArray.shift(pipe);
		}

		// detect if the pipe is crossed
		if (pipe.x + pipe.width < BIRD.x && !pipe.passed) {
			pipe.passed = true
		}

		// detect if the game is over
		if (detectCollision(BIRD, pipe)) {
			gameOver = true;
		}
	}

	// loop the animation
	requestAnimationFrame(updateFrames); 
}


// prevent the bird from going outside the screen
function setBirdBoundary() {
	// Prevent the bird from going above the screen
	let top = 0;
	if (BIRD.y < top) {
		BIRD.y = top;
		birdVelocity = 0; 
	}
	// Prevent the bird from going below the screen
	let bottom = board.height - BIRD.height;
	if (BIRD.y > bottom) {
		BIRD.y = bottom;
		birdVelocity = 0; 
	}
}


// place the pipes
function generatePipes() {
	// stop the function if the game is over
	if (gameOver) return;
	console.log(pipeArray)


	// random Y positions for the pipes 
	let randomPipeY = Math.random() * (board.height * 0.5) + board.height * 0.3; 

	// new top pipes
	let topPipe = {
		width: TOP_PIPE.width,
		height: TOP_PIPE.height,
		x: TOP_PIPE.x,
		y: -randomPipeY, // move the top pipe a little upwards for randomly 
		image: topPipeImage, 
		passed: false,
	}
	pipeArray.push(topPipe); // add the new pipe

	// new bottom pipes
	let bottomPipe = {
		width: TOP_PIPE.width,
		height: TOP_PIPE.height,
		x: TOP_PIPE.x,
		y: TOP_PIPE.height + pipeSpacing - randomPipeY, // move the bottom pipe a little downwards randomly 
		image: bottomPipeImage, 
		passed: false,
	}
	pipeArray.push(bottomPipe); // add the new pipe
}


// make the bird jump on keypress
function jumpOnKeypress(e) {
	if (gameOver) return;

	// jump if any key is pressed
	if ( 
		e.code === 'Space' || 
		e.code === 'KeyW' || 
		e.code === 'ArrowUp' ||
		e.code === 'NumpadEnter' ||
		e.code === 'Enter'
	) {
		birdVelocity = jumpVelocity;
	}
}


// detect if the game is over (collision between bird and pipe)
function detectCollision(bird, pipe) {
	return (
		// collision in the x axis
        bird.x + bird.width > pipe.x && 
		bird.x < pipe.x + pipe.width && 

		// collision in the y axis
        bird.y + bird.height > pipe.y &&
        bird.y < pipe.y + pipe.height 
	);
}
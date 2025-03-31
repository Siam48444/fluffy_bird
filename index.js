// board
const board = document.getElementById('board');
const context = board.getContext('2d'); // used for 2 dimensional drawing on the board

const BOARD = {
	width: window.innerWidth,
	height: window.innerHeight,
}

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
let birdVelocity = 0; // initial velocity of the bird
let jumpVelocity = -8; // velocity of the jumping bird

let pipeVelocity = -5; // velocity of the moving pipes
let pipeInterval = 800; // time between each pipe generation (in milliseconds)
let pipeSpacing = BIRD.height * 5; // space between the pipes
let pipeArray = []; // used to add more pipes in the game

let gameOver = false;




window.addEventListener('DOMContentLoaded', () => {
	// draw the bird
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height); 

	// make the bird jump
	window.addEventListener('keydown', jumpOnKeypress);
	window.addEventListener('click', () => { birdVelocity = jumpVelocity });

	// start the animations
	requestAnimationFrame(update);
	setInterval(placePipes, pipeInterval);
});


// update the frames
function update() {
	// stop the function if the game is over
	if (gameOver) return;

	// Clear previous frame
	context.clearRect(0, 0, board.width, board.height); 

	// update the bird velocity using the gravity
	BIRD.y += birdVelocity;
	birdVelocity += gravity; 

	// Prevent the bird from going above the screen
	if (BIRD.y < 0) {
		BIRD.y = 0;
		birdVelocity = 0; 
	}
	// Prevent the bird from going below the screen
	if (BIRD.y > BOARD.height - BIRD.height) {
		BIRD.y = BOARD.height - BIRD.height;
		birdVelocity = 0; 
	}

	//draw the bird
	context.drawImage(birdImage, BIRD.x, BIRD.y, BIRD.width, BIRD.height);

	// draw the new pipes from the pipe array
	for (let pipe of pipeArray) {
		pipe.x += pipeVelocity; // move the pipes to the left
		context.drawImage(pipe.image, pipe.x, pipe.y, pipe.width, pipe.height); // draw the pipes

		// detect if the game is over
		if (detectCollision(BIRD, pipe)) {
			gameOver = true;
		}
	}

	// loop the animation
	requestAnimationFrame(update); 
}


// place the pipes
function placePipes() {
	// stop the function if the game is over
	if (gameOver) return;

	// random Y positions for the pipes 
	let randomPipeY = (Math.random() * TOP_PIPE.height / 2.2); 

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
        bird.x + bird.width > pipe.x && // Bird's right edge is right of pipe's left edge
		bird.x < pipe.x + pipe.width && // Bird's left edge is left of pipe's right edge
        bird.y + bird.height > pipe.y && // Bird's bottom edge is below pipe's top edge
        bird.y < pipe.y + pipe.height // Bird's top edge is above pipe's bottom edge
	);
}
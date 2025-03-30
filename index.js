// board
let board, context;
const board = {
	width : window.innerWidth,
	height : window.innerHeight,
}

// bird
let birdImage;
const bird = {
	width : 50,
	height : 50,
	x : board.width / 5,
	y : board.height / 2.2,
}

// pipes
let topPipeImage, bottomPipeImage;
const pipe = {
	width : 50,
	height : board.height / 2,
	x : board.width,
	y : 0, 
}

// physics
const gravity = 4;



window.onload = () => {
	board = document.getElementById('board');
	context = board.getContext('2d'); // used for 2d drawing on the board

	// set the game board dimensions
	board.width = board.width;
	board.height = board.height;

	// draw the fluffy bird
	birdImage = new Image();
	birdImage.src = './assets/images/bird.png';
	context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

	// draw pipes
	// topPipeImage = new Image();
	// topPipeImage.src = './assets/images/topPipe.png';
	context.fillStyle = 'red';
	context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);

	setInterval(placePipes, 2000);
	requestAnimationFrame(update);
}	


function update() {
	context.clearRect(0, 0, board.width, board.height); // Clear previous frame

	bird.y += gravity; // Move bird down
	context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

	pipe.x -= gravity;
	context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);

	requestAnimationFrame(update); // loop the animation
}


function placePipes() {

}
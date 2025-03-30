// board
const BOARD = {
	width : window.innerWidth,
	height : window.innerHeight,
}



window.onload = () => {
	const board = document.getElementById('board');
	board.width = BOARD.width;
	board.height = BOARD.height;

	console.log(window)
}
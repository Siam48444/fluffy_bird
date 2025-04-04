export const flapSound = new Audio('./assets/sounds/flapSound.mp3');
export const collideSound = new Audio('./assets/sounds/collideSound.mp3');


// function to play the sound
export function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}
export const flapSound = new Audio('./assets/sounds/flap.mp3');


// function to play the sound
export function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}
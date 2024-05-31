export const play = (tone: string) => {
	const sound = new Audio(`./assets/${tone}.mp3`)
	sound.play()
}

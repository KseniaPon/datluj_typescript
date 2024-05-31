export const Play = (sound: string) => {
    const playSound = new Audio(sound)
    playSound.play()
}
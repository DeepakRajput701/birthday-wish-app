export const playSound = (soundName: 'confetti' | 'click' | 'success') => {
  const sounds = {
    confetti: '/sounds/confetti.mp3',
    click: '/sounds/click.mp3',
    success: '/sounds/success.mp3',
  };

  const audio = new Audio(sounds[soundName]);
  audio.volume = 0.5;
  audio.play().catch(error => console.log('Audio play failed:', error));
}; 
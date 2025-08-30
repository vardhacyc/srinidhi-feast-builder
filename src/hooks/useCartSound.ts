import { useCallback, useRef } from 'react';

export const useCartSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      // Create a subtle bell-like sound using Web Audio API
      audioRef.current = new Audio();
      audioRef.current.volume = 0.3;
      
      // Generate a pleasant chime sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      
      return { oscillator, audioContext };
    }
    return null;
  }, []);

  const playCartSound = useCallback(() => {
    try {
      const audioData = initAudio();
      if (audioData) {
        audioData.oscillator.start();
        audioData.oscillator.stop(audioData.audioContext.currentTime + 0.4);
      }
    } catch (error) {
      console.log('Audio not supported');
    }
  }, [initAudio]);

  return { playCartSound };
};
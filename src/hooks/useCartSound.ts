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
      // Create a sword unsheathing sound effect
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Main scraping sound
      const oscillator1 = audioContext.createOscillator();
      const gainNode1 = audioContext.createGain();
      
      // Final metallic "ting" sound
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      
      // Connect main scraping sound
      oscillator1.connect(gainNode1);
      gainNode1.connect(audioContext.destination);
      
      // Connect ting sound
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      
      // Main scraping sound - starts high, goes down (metallic scraping)
      oscillator1.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
      
      // Scraping sound volume envelope
      gainNode1.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode1.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
      gainNode1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      
      // Final "ting" sound - sharp metallic ring
      oscillator2.frequency.setValueAtTime(1200, audioContext.currentTime + 0.25);
      oscillator2.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.4);
      
      // Ting sound volume envelope - quick bright ring
      gainNode2.gain.setValueAtTime(0, audioContext.currentTime + 0.25);
      gainNode2.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.27);
      gainNode2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      
      // Start sounds
      oscillator1.start();
      oscillator1.stop(audioContext.currentTime + 0.3);
      
      oscillator2.start(audioContext.currentTime + 0.25);
      oscillator2.stop(audioContext.currentTime + 0.4);
    } catch (error) {
      console.log('Audio not supported');
    }
  }, []);

  return { playCartSound };
};
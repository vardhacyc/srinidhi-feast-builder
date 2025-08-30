import { useCallback, useRef } from 'react';

export const useCartSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playCartSound = useCallback(() => {
    // Check for accessibility preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Prevent overlapping sounds
    if (isPlayingRef.current) {
      return;
    }

    try {
      const audioContext = initAudioContext();
      if (!audioContext) return;

      isPlayingRef.current = true;

      // Create a more sophisticated sword unsheathing sound
      const now = audioContext.currentTime;
      
      // Main metallic scraping sound
      const oscillator1 = audioContext.createOscillator();
      const gainNode1 = audioContext.createGain();
      const filter1 = audioContext.createBiquadFilter();
      
      // Sharp metallic "cling" at the end
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      const filter2 = audioContext.createBiquadFilter();
      
      // Setup main scraping sound chain
      oscillator1.connect(filter1);
      filter1.connect(gainNode1);
      gainNode1.connect(audioContext.destination);
      
      // Setup cling sound chain
      oscillator2.connect(filter2);
      filter2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      
      // Configure main scraping sound - metallic swoosh
      oscillator1.type = 'sawtooth'; // More metallic than sine
      oscillator1.frequency.setValueAtTime(1000, now);
      oscillator1.frequency.exponentialRampToValueAtTime(300, now + 0.25);
      
      filter1.type = 'highpass';
      filter1.frequency.setValueAtTime(200, now);
      filter1.Q.setValueAtTime(2, now);
      
      gainNode1.gain.setValueAtTime(0, now);
      gainNode1.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gainNode1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      // Configure sharp metallic cling
      oscillator2.type = 'square'; // Sharp metallic sound
      oscillator2.frequency.setValueAtTime(1800, now + 0.2);
      oscillator2.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
      
      filter2.type = 'bandpass';
      filter2.frequency.setValueAtTime(1500, now + 0.2);
      filter2.Q.setValueAtTime(8, now + 0.2);
      
      gainNode2.gain.setValueAtTime(0, now + 0.2);
      gainNode2.gain.linearRampToValueAtTime(0.15, now + 0.22);
      gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      // Start and stop oscillators
      oscillator1.start(now);
      oscillator1.stop(now + 0.25);
      
      oscillator2.start(now + 0.2);
      oscillator2.stop(now + 0.35);
      
      // Reset playing flag after sound completes
      setTimeout(() => {
        isPlayingRef.current = false;
      }, 400);
      
    } catch (error) {
      console.log('Audio not supported');
      isPlayingRef.current = false;
    }
  }, [initAudioContext]);

  return { playCartSound };
};
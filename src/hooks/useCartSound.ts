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
    // Sound disabled - only visual animation will play
    return;
  }, []);

  return { playCartSound };
};
import { useState, useEffect } from 'react';

interface AccessibilitySettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
}

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Get saved preferences or use defaults
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fall back to defaults if parsing fails
      }
    }
    
    // Default settings - respect system preferences
    return {
      soundEnabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationsEnabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const toggleSound = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const toggleAnimations = () => {
    setSettings(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, soundEnabled: enabled }));
  };

  const setAnimationsEnabled = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, animationsEnabled: enabled }));
  };

  return {
    ...settings,
    toggleSound,
    toggleAnimations,
    setSoundEnabled,
    setAnimationsEnabled
  };
};
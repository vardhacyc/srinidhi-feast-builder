import { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
    const [phase, setPhase] = useState<'logo' | 'text' | 'fade'>('logo');
    const [visibleLetters, setVisibleLetters] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const brandName = "SRI NIDHI";
    const tagline = "CATERING";

    useEffect(() => {
        // Phase 1: Show logo (0.5s)
        const logoTimer = setTimeout(() => {
            setPhase('text');
        }, 500);

        return () => clearTimeout(logoTimer);
    }, []);

    useEffect(() => {
        if (phase === 'text') {
            // Animate letters one by one
            const letterInterval = setInterval(() => {
                setVisibleLetters(prev => {
                    if (prev < brandName.length) {
                        return prev + 1;
                    }
                    clearInterval(letterInterval);
                    return prev;
                });
            }, 80);

            return () => clearInterval(letterInterval);
        }
    }, [phase]);

    useEffect(() => {
        if (visibleLetters === brandName.length) {
            // Wait a bit, then fade out
            const fadeTimer = setTimeout(() => {
                setPhase('fade');
                setIsVisible(false);
                setTimeout(onLoadComplete, 600);
            }, 800);

            return () => clearTimeout(fadeTimer);
        }
    }, [visibleLetters, onLoadComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-600 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            style={{ background: '#0A0A0A' }}
        >
            {/* Ambient background glow */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.08) 0%, transparent 60%)',
                    opacity: phase !== 'logo' ? 1 : 0
                }}
            ></div>

            <div className="text-center relative z-10">
                {/* Logo - fades in first */}
                <div
                    className={`mb-8 transition-all duration-500 ${phase === 'logo' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                        }`}
                >
                    <img
                        src="/cateringLogo.png"
                        alt="Sri Nidhi Catering Logo"
                        className="w-20 h-20 md:w-24 md:h-24 object-contain mx-auto"
                        style={{
                            filter: 'drop-shadow(0 0 20px rgba(201, 162, 39, 0.4))',
                        }}
                    />
                </div>

                {/* Animated Text - Letter by letter reveal */}
                <h1 className="mb-3 overflow-hidden">
                    <div className="flex justify-center items-center gap-[2px] md:gap-1">
                        {brandName.split('').map((letter, index) => (
                            <span
                                key={index}
                                className={`inline-block text-4xl md:text-6xl lg:text-7xl font-light tracking-wider transition-all duration-300 ${letter === ' ' ? 'w-4 md:w-6' : ''
                                    }`}
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: '#C9A227',
                                    opacity: index < visibleLetters ? 1 : 0,
                                    transform: index < visibleLetters
                                        ? 'translateY(0) rotateX(0)'
                                        : 'translateY(30px) rotateX(-90deg)',
                                    transitionDelay: `${index * 30}ms`,
                                    textShadow: index < visibleLetters
                                        ? '0 0 40px rgba(201, 162, 39, 0.5)'
                                        : 'none',
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                        ))}
                    </div>
                </h1>

                {/* Tagline - fades in after text */}
                <div
                    className={`transition-all duration-500 delay-300 ${visibleLetters === brandName.length
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4'
                        }`}
                >
                    <span
                        className="text-sm md:text-base tracking-[0.4em] uppercase font-light"
                        style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                    >
                        {tagline}
                    </span>
                </div>

                {/* Animated line under text */}
                <div
                    className={`mx-auto mt-6 h-px transition-all duration-700 ease-out ${visibleLetters === brandName.length ? 'w-32' : 'w-0'
                        }`}
                    style={{
                        background: 'linear-gradient(90deg, transparent, #C9A227, transparent)'
                    }}
                ></div>

                {/* Loading dots */}
                <div
                    className={`mt-8 flex justify-center gap-2 transition-opacity duration-300 ${phase === 'fade' ? 'opacity-0' : 'opacity-100'
                        }`}
                >
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full animate-bounce"
                            style={{
                                background: '#C9A227',
                                animationDelay: `${i * 150}ms`,
                                animationDuration: '0.8s'
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;

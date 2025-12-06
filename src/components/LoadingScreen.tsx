import { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadComplete, 500);
        }, 2000);

        return () => clearTimeout(timer);
    }, [onLoadComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ background: '#0A0A0A' }}
        >
            {/* Animated gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(201, 162, 39, 0.1) 0%, transparent 50%)'
                }}
            ></div>

            <div className="text-center relative z-10">
                {/* Decorative line */}
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#C9A227] to-transparent mx-auto mb-8 animate-pulse"></div>

                {/* Logo */}
                <div className="relative mb-6">
                    <img
                        src="/cateringLogo.png"
                        alt="Sri Nidhi Catering Logo"
                        className="w-20 h-20 object-contain mx-auto"
                    />
                </div>

                {/* Title */}
                <h1 className="mb-2">
                    <span
                        className="block text-3xl md:text-4xl font-light text-white"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Sri Nidhi
                    </span>
                    <span
                        className="block text-xs tracking-[0.3em] uppercase mt-2"
                        style={{ color: '#C9A227' }}
                    >
                        Catering
                    </span>
                </h1>

                {/* Tagline */}
                <p className="text-white/40 text-sm mt-6 tracking-wide">
                    Premium Gourmet Catering
                </p>

                {/* Loading indicator */}
                <div className="mt-8 flex justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full animate-bounce"
                            style={{
                                background: '#C9A227',
                                animationDelay: `${i * 0.2}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;

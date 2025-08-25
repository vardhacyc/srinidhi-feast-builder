import React from 'react';

const KolamWelcome: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-30 hidden sm:block pointer-events-none"
    >
      <svg
        width="96"
        height="96"
        viewBox="0 0 120 120"
        role="img"
        aria-label="Kolam motif"
        className="kolam-container"
      >
        {/* Simple elegant kolam motif */}
        <circle cx="60" cy="60" r="44" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" className="kolam-path" />
        <path
          className="kolam-path"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          d="M20,60 C20,35 35,20 60,20 C85,20 100,35 100,60 C100,85 85,100 60,100 C35,100 20,85 20,60 Z
             M35,60 C35,45 45,35 60,35 C75,35 85,45 85,60 C85,75 75,85 60,85 C45,85 35,75 35,60 Z"
        />
        {/* Decorative dots */}
        <circle cx="30" cy="30" r="2" className="kolam-dot" />
        <circle cx="90" cy="30" r="2" className="kolam-dot" />
        <circle cx="30" cy="90" r="2" className="kolam-dot" />
        <circle cx="90" cy="90" r="2" className="kolam-dot" />
      </svg>
    </div>
  );
};

export default KolamWelcome;

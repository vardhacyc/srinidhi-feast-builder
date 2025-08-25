import React, { useState, useEffect, useRef } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  base: string;                 // base filename without extension
  folder?: string;              // primary folder inside public
  folderFallbacks?: string[];   // secondary folders to try if not found
  extensions?: string[];        // extension priority order
  fallbackSrc?: string;         // final static fallback
  aspectRatio?: string;         // e.g. "4/3" or "1/1"
  showCaption?: boolean;        // show alt text as overlay when fallback
  debug?: boolean;              // logs attempts
}

const DEFAULT_EXTS = ['avif','webp','jpg','jpeg','png'];

export const SmartImage: React.FC<SmartImageProps> = ({
  base,
  folder = '/diwaliSweets',
  folderFallbacks = ['/images/diwali','/diwali','/'],
  extensions = DEFAULT_EXTS,
  fallbackSrc = '/placeholder.svg?text=Sweet&w=300&h=300',
  alt,
  className = '',
  aspectRatio = '1/1',
  showCaption = false,
  debug = false,
  ...rest
}) => {
  // Allow override via env variable (must start with VITE_ to be exposed)
  const envFolder = (import.meta as any).env?.VITE_DIWALI_IMG_BASE as string | undefined;
  const primaryFolder = (envFolder || folder).replace(/\/$/, '');
  const triedRef = useRef<string[]>([]);

  const [extIndex, setExtIndex] = useState(0);
  const [folderIndex, setFolderIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const folders = [primaryFolder, ...folderFallbacks.map(f=>f.replace(/\/$/, ''))];
  const currentFolder = folders[folderIndex];
  const currentSrc = failed ? fallbackSrc : `${currentFolder}/${base}.${extensions[extIndex]}`;

  useEffect(()=>{ if(debug){ console.log('[SmartImage] trying', currentSrc); triedRef.current.push(currentSrc);} },[currentSrc, debug]);

  const handleError = () => {
    if (failed) return;
    if (extIndex < extensions.length - 1) {
      setExtIndex(i => i + 1);
      return;
    }
    // move to next folder & reset extension index
    if (folderIndex < folders.length - 1) {
      setFolderIndex(i => i + 1);
      setExtIndex(0);
      return;
    }
    setFailed(true);
  };

  return (
    <figure
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio,
        '--smart-loaded': loaded ? 1 : 0,
        '--smart-failed': failed ? 1 : 0
      } as React.CSSProperties}
    >
      {/* Skeleton shimmer */}
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#2a2100_8%,#3b2e08_18%,#2a2100_33%)] bg-[length:200%_100%]" style={{animation:'shimmer 1.6s linear infinite'}} />
      )}
      {/* Actual img */}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${failed ? 'opacity-0' : ''}`}
        {...rest}
      />
      {/* Final fallback visual */}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-center px-3 bg-[radial-gradient(circle_at_40%_35%,#3b2e08,#2a2100_65%)] border border-[#FFE14844] text-[#FFE148] text-xs font-medium tracking-wide">
          <span>{alt}</span>
        </div>
      )}
      {showCaption && alt && (
        <figcaption className="absolute bottom-0 left-0 right-0 text-[10px] tracking-wider uppercase text-[#FFE148] bg-[#1d1604]/55 backdrop-blur-sm py-1 px-2 flex justify-between">
          <span className="truncate">{alt}</span>
          {failed && <span className="opacity-70">(placeholder)</span>}
        </figcaption>
      )}
      <style>{`
        @keyframes shimmer {0%{background-position:0 0;}100%{background-position:-200% 0;}}
      `}</style>
    </figure>
  );
};

export default SmartImage;

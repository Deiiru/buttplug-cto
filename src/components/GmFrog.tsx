import { motion } from "framer-motion";
import { useThrottle } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

type GmFrogProps = {
  src?: string;
  alt?: string;
  onSmash?: () => void;
  size?: number;
};

export default function GmFrog({
  src,
  alt = "GM frog mascot",
  onSmash,
  size = 280,
}: GmFrogProps) {
  // Responsive size handled by CSS classes
  const { theme } = useTheme();
  
  // Use the specified src or default to Buttplugcto.png
  const frogSrc = src || '/Buttplugcto.png';
  const throttledSmash = useThrottle(() => {
    onSmash?.();
  }, 200);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      throttledSmash();
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* The frog image with glow effect - responsive sizing */}
      <motion.img
        src={frogSrc}
        alt={alt}
        width={size}
        height={size}
        className="cursor-pointer select-none no-select drop-shadow-2xl object-contain w-[180px] h-[180px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px]"
        style={{
          filter: theme === 'dark' ? `
            drop-shadow(0 0 20px rgba(239, 68, 68, 0.6))
            drop-shadow(0 0 40px rgba(220, 38, 38, 0.4))
            drop-shadow(0 0 60px rgba(239, 68, 68, 0.3))
          ` : `
            drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))
            drop-shadow(0 0 40px rgba(37, 99, 235, 0.4))
            drop-shadow(0 0 60px rgba(29, 78, 216, 0.3))
          `
        }}
        whileHover={{ 
          y: -6, 
          scale: 1.05,
          filter: theme === 'dark' ? `
            brightness(1.1) saturate(1.1)
            drop-shadow(0 0 25px rgba(239, 68, 68, 0.8))
            drop-shadow(0 0 50px rgba(220, 38, 38, 0.6))
            drop-shadow(0 0 75px rgba(239, 68, 68, 0.4))
          ` : `
            brightness(1.1) saturate(1.1)
            drop-shadow(0 0 25px rgba(59, 130, 246, 0.8))
            drop-shadow(0 0 50px rgba(37, 99, 235, 0.6))
            drop-shadow(0 0 75px rgba(29, 78, 216, 0.4))
          `,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileTap={{ 
          scaleX: 0.92, 
          scaleY: 1.08, 
          rotate: -2,
          transition: { duration: 0.1 }
        }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: 0,
          y: 0
        }}
        key={frogSrc} // This will trigger re-animation when image changes
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        onClick={throttledSmash}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Click to say GM"
      />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  backgroundElement?: React.ReactNode;
}

const ParallaxSection = ({ 
  children, 
  className = "", 
  speed = 0.3,
  backgroundElement 
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        setOffset(scrolled * speed);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background */}
      {backgroundElement && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${offset}px)` }}
        >
          {backgroundElement}
        </div>
      )}
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              transform: `translateY(${offset * (0.2 + i * 0.1)}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxSection;

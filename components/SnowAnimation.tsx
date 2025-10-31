import React, { useEffect, useState, useMemo } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'circle' | 'flake';
  rotation: number;
  rotationSpeed: number;
  wobbleSpeed: number;
  wobbleAmount: number;
}

const SnowAnimation: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  // Snowflake characters for variety
  const snowflakeChars = useMemo(() => ['❄', '❅', '❆', '✻', '✼', '❉'], []);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Create initial snowflakes - more snowflakes for a denser effect
    const initialSnowflakes = Array.from({ length: 80 }, (_, index) => createSnowflake(index));
    setSnowflakes(initialSnowflakes);

    // Animation frame for moving snowflakes
    let animationFrameId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime === 0) {
        lastTime = time;
      }
      const deltaTime = time - lastTime;
      lastTime = time;

      setSnowflakes((prevSnowflakes) =>
        prevSnowflakes.map((flake) => {
          // Move snowflake down and add wobble effect
          const y = flake.y + flake.speed * (deltaTime / 16);

          // More natural horizontal movement with wobble
          const wobble = Math.sin(y * flake.wobbleSpeed) * flake.wobbleAmount;
          let x = flake.x + wobble;

          // Update rotation for snowflake characters
          const rotation = flake.type === 'flake' 
            ? (flake.rotation + flake.rotationSpeed * (deltaTime / 16)) % 360 
            : 0;

          // Reset if snowflake goes off screen
          if (y > dimensions.height) {
            return createSnowflake(flake.id);
          }

          // Keep snowflake within screen bounds with some overflow allowed
          if (x < -20) x = dimensions.width + 20;
          if (x > dimensions.width + 20) x = -20;

          return { ...flake, x, y, rotation };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup animation frame and event listener on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions.height, dimensions.width, snowflakeChars]);

  // Create a new snowflake with random properties
  const createSnowflake = (id: number): Snowflake => {
    // Randomize between circle and character snowflakes
    const type = Math.random() > 0.5 ? 'circle' : 'flake';

    // Vary sizes more for visual interest
    const size = type === 'circle' 
      ? Math.random() * 4 + 1 // Smaller circles (1-5px)
      : Math.random() * 10 + 10; // Larger flake characters (10-20px)

    // Larger flakes fall slower for realistic effect
    const speedFactor = type === 'circle' ? 1 : 0.7;
    const speed = (Math.random() * 1.5 + 0.5) * speedFactor;

    return {
      id,
      x: Math.random() * dimensions.width,
      y: Math.random() * -200, // Start further above the screen for staggered entry
      size,
      speed,
      opacity: Math.random() * 0.4 + 0.4, // Slightly more transparent (0.4-0.8)
      type,
      rotation: Math.random() * 360, // Random initial rotation
      rotationSpeed: (Math.random() * 0.5 + 0.1) * (Math.random() > 0.5 ? 1 : -1), // Random rotation speed and direction
      wobbleSpeed: Math.random() * 0.02 + 0.01, // How fast it wobbles side to side
      wobbleAmount: Math.random() * 2 + 0.5, // How much it wobbles
    };
  };

  return (
    <div className="snow-container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            fontSize: flake.type === 'flake' ? `${flake.size}px` : undefined,
            width: flake.type === 'circle' ? `${flake.size}px` : 'auto',
            height: flake.type === 'circle' ? `${flake.size}px` : 'auto',
            opacity: flake.opacity,
            backgroundColor: flake.type === 'circle' ? '#ffffff' : 'transparent',
            borderRadius: flake.type === 'circle' ? '50%' : '0',
            transform: flake.type === 'flake' ? `rotate(${flake.rotation}deg)` : 'none',
            position: 'absolute',
            filter: `blur(${flake.type === 'circle' ? Math.min(flake.size / 3, 1) : 0}px) drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))`,
            textShadow: flake.type === 'flake' ? '0 0 3px rgba(255, 255, 255, 0.5)' : 'none',
            willChange: 'transform, top, left', // Performance optimization
          }}
        >
          {flake.type === 'flake' ? snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)] : ''}
        </div>
      ))}
    </div>
  );
};

export default SnowAnimation;

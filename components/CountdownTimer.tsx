import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Event has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clean up on unmount
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-playfair font-semibold text-snow-white mb-4">
        Event Starts In
      </h3>
      <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-midnight border-2 border-ice-blue rounded-lg p-2 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center">
            <span className="text-2xl md:text-4xl font-bold text-snow-white">
              {timeLeft.days}
            </span>
          </div>
          <span className="text-xs md:text-sm text-frost-blue mt-1">Days</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-midnight border-2 border-ice-blue rounded-lg p-2 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center">
            <span className="text-2xl md:text-4xl font-bold text-snow-white">
              {timeLeft.hours}
            </span>
          </div>
          <span className="text-xs md:text-sm text-frost-blue mt-1">Hours</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-midnight border-2 border-ice-blue rounded-lg p-2 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center">
            <span className="text-2xl md:text-4xl font-bold text-snow-white">
              {timeLeft.minutes}
            </span>
          </div>
          <span className="text-xs md:text-sm text-frost-blue mt-1">Minutes</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-midnight border-2 border-ice-blue rounded-lg p-2 md:p-4 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center">
            <span className="text-2xl md:text-4xl font-bold text-snow-white">
              {timeLeft.seconds}
            </span>
          </div>
          <span className="text-xs md:text-sm text-frost-blue mt-1">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
import { useEffect, useState } from 'react';
import { calculateCountdown, CountdownData } from '../utils/countdown';

interface CountdownGridProps {
  dateOfBirth: string;
}

export default function CountdownGrid({ dateOfBirth }: CountdownGridProps) {
  const [countdown, setCountdown] = useState<CountdownData | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(calculateCountdown(dateOfBirth));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [dateOfBirth]);

  if (!countdown) return null;

  const gridSize = 30;
  const totalBlocks = gridSize * gridSize;
  const filledBlocks = Math.floor((countdown.percentage / 100) * totalBlocks);

  return (
    <div className="space-y-8">
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm transition-all duration-500 ${
                i < filledBlocks ? 'bg-neutral-400' : 'bg-red-600'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <p className="text-neutral-400 text-sm font-medium mb-2">DAYS REMAINING</p>
          <p className="text-5xl font-bold text-red-500">{countdown.remainingDays.toLocaleString()}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <p className="text-neutral-400 text-sm font-medium mb-2">HOURS</p>
          <p className="text-5xl font-bold text-red-500">{String(countdown.remainingHours).padStart(2, '0')}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <p className="text-neutral-400 text-sm font-medium mb-2">MINUTES</p>
          <p className="text-5xl font-bold text-red-500">{String(countdown.remainingMinutes).padStart(2, '0')}</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <p className="text-neutral-400 text-sm font-medium mb-2">SECONDS</p>
          <p className="text-5xl font-bold text-red-500">{String(countdown.remainingSeconds).padStart(2, '0')}</p>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold">Life Progress</p>
          <p className="text-red-400 font-mono">{countdown.percentage.toFixed(1)}%</p>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${countdown.percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

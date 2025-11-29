export interface CountdownData {
  totalDays: number;
  remainingDays: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
  percentage: number;
}

const AVERAGE_LIFESPAN = 80;

export function calculateCountdown(dateOfBirth: string): CountdownData {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  birthDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const ageInMs = today.getTime() - birthDate.getTime();
  const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));

  const totalDays = Math.floor(AVERAGE_LIFESPAN * 365.25);
  const livedDays = ageInDays;
  const remainingDays = Math.max(0, totalDays - livedDays);

  const now = new Date();
  const startOfToday = new Date(today);
  const timeElapsedToday = now.getTime() - startOfToday.getTime();
  const timeRemainingToday = (24 * 60 * 60 * 1000) - timeElapsedToday;
  const hours = Math.floor((timeRemainingToday / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeRemainingToday / (1000 * 60)) % 60);
  const seconds = Math.floor((timeRemainingToday / 1000) % 60);

  const percentage = Math.max(0, Math.min(100, (livedDays / totalDays) * 100));

  return {
    totalDays,
    remainingDays: Math.max(0, remainingDays),
    remainingHours: hours,
    remainingMinutes: minutes,
    remainingSeconds: seconds,
    percentage,
  };
}

export const MOTIVATIONAL_QUOTES = [
  "The greatest gift is the time you have. Don't waste it.",
  "Life is what happens while you're busy making other plans.",
  "Your time is limited. Use it to do something worthwhile.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "Time is the most valuable commodity. Spend it wisely.",
  "Don't count the days. Make the days count.",
  "The future depends on what you do today.",
  "Yesterday is history. Tomorrow is a mystery. Today is a gift.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Life is either a daring adventure or nothing at all.",
];

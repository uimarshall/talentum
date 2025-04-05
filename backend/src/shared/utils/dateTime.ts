import { add } from 'date-fns';

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const thirtyDaysFromNow = (): Date => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const fortyFiveMinutesFromNow = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  return now;
};
export const tenMinutesAgo = (): Date => new Date(Date.now() - 10 * 60 * 1000);

export const threeMinutesAgo = (): Date => new Date(Date.now() - 3 * 60 * 1000);

export const anHourFromNow = (): Date => new Date(Date.now() + 60 * 60 * 1000);

export const calculateExpirationDate = (expiresIn: string = '15m'): Date => {
  // Match number + unit (m = minutes, h = hours, d = days)
  const match = expiresIn.match(/^(\d+)([mhd])$/);
  if (!match) throw new Error('Invalid format. Use "15m", "1h", or "2d".');
  const [, value, unit] = match;
  const expirationDate = new Date();

  // Check the unit and apply accordingly
  switch (unit) {
    case 'm': // minutes
      return add(expirationDate, { minutes: parseInt(value) });
    case 'h': // hours
      return add(expirationDate, { hours: parseInt(value) });
    case 'd': // days
      return add(expirationDate, { days: parseInt(value) });
    default:
      throw new Error('Invalid unit. Use "m", "h", or "d".');
  }
};
export const isDateInFuture = (date: Date): boolean => date.getTime() > Date.now();
export const isDateInPast = (date: Date): boolean => date.getTime() < Date.now();
export const isDateEqual = (date1: Date, date2: Date): boolean => date1.getTime() === date2.getTime();
export const isDateInRange = (date: Date, start: Date, end: Date): boolean => date >= start && date <= end;

// Example usage:
// const expirationDate = calculateExpirationDate('15m'); // 15 minutes from now
// console.log('Expiration Date:', expirationDate.toISOString());
// console.log('Is in future:', isDateInFuture(expirationDate)); // true
// console.log('Is in past:', isDateInPast(expirationDate)); // false

import {
  setDate,
  isAfter,
  subMonths,
  endOfMonth,
  startOfMonth,
  getDaysInMonth,
  differenceInDays,
  eachMonthOfInterval,
  addMonths,
  parse,
} from 'date-fns';
import { CreditCard } from './CreditCard';
import { Movement } from './Movement';
import { History } from './History';

export function generateHistory(
  month: Date,
  index: number,
  months: Date[],
  prevValues: number[],
  debits: number,
  movement: Movement,
): History {
  const prevDate = index === 0 ? parse(movement.date, 'yyyy-MM-dd', new Date()) : months[index - 1];
  const firstMonthDays = getDaysInMonth(prevDate);
  const firstPartDays = differenceInDays(endOfMonth(prevDate), prevDate);
  const firstDailyRate = ((1 + (movement.monthlyRate / 100)) ** (1 / firstMonthDays) - 1);
  const firstPartRate = ((1 + firstDailyRate) ** firstPartDays) - 1;
  const secondMonthDays = getDaysInMonth(month);
  const secondPartDays = differenceInDays(month, startOfMonth(month)) + 1;
  const secondDailyRate = ((1 + (movement.monthlyRate / 100)) ** (1 / secondMonthDays) - 1);
  const secondPartRate = ((1 + secondDailyRate) ** secondPartDays) - 1;
  const prevBalance = index === 0 ? movement.value : prevValues[index - 1];
  const prevBalance100 = Math.round(prevBalance * 100);
  const firstPartInterest = Math.round(prevBalance100 * firstPartRate);
  const interest100 = Math.round((prevBalance100 + firstPartInterest) * secondPartRate);
  const debits100 = Math.round(debits * 100);
  const balance = (prevBalance100 - debits100) / 100;
  prevValues.push(balance);
  return {
    date: month,
    quotas: movement.quotas,
    debits,
    credits: 0,
    balance,
    interest: interest100 / 100,
    total: (interest100 + debits100) / 100,
  };
}

export function generateFullHistory(movement: Movement, card: CreditCard) {
  let lastCutoffDate: Date = setDate(new Date(), card.cutoffDay);
  if (isAfter(lastCutoffDate, new Date())) {
    lastCutoffDate = subMonths(lastCutoffDate, 1);
  }
  let start = parse(movement.date, 'yyyy-MM-dd', new Date());
  if (isAfter(start, setDate(start, card.cutoffDay))) {
    start = addMonths(parse(movement.date, 'yyyy-MM-dd', new Date()), 1);
  }
  const months = eachMonthOfInterval({ start, end: lastCutoffDate });
  for (let index = months.length - 1; index >= 0; index -= 1) {
    months[index] = setDate(months[index], card.cutoffDay);
  }
  const prevValues: number[] = [];
  const debits = Math.round((100 * movement.value) / movement.quotas) / 100;
  // eslint-disable-next-line no-param-reassign
  movement.history = months.map<History>(
    (month, index) => generateHistory(month, index, months, prevValues, debits, movement),
  );
}

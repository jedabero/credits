import {
  eachMonthOfInterval, setDate, isAfter, subMonths,
} from 'date-fns';
import { CreditCard } from './CreditCard';
import { History } from './History';

export default class Movement {
  authNumber: string;

  date: Date;

  description: string;

  value: number; // initial balance

  monthlyRate: number;

  yearlyRate: number;

  quotas: number; // initial quotes

  card: CreditCard;

  history?: History[];

  constructor(
    authNumber: string,
    date: Date,
    description: string,
    value: number,
    monthlyRate: number,
    yearlyRate: number,
    quotas: number,
    card: CreditCard,
    history?: History[],
  ) {
    this.authNumber = authNumber;
    this.date = date;
    this.description = description;
    this.value = value;
    this.monthlyRate = monthlyRate;
    this.yearlyRate = yearlyRate;
    this.quotas = quotas;
    this.card = card;
    if (!history) {
      this.generateHistory();
    } else {
      this.history = history;
    }
  }

  generateHistory() {
    let lastCutoffDate: Date = setDate(new Date(), this.card.cutoffDay);
    if (isAfter(lastCutoffDate, new Date())) {
      lastCutoffDate = subMonths(lastCutoffDate, 1);
    }
    const months = eachMonthOfInterval({ start: this.date, end: lastCutoffDate });
    for (let index = months.length - 1; index >= 0; index -= 1) {
      months[index] = setDate(months[index], this.card.cutoffDay);
    }
    this.history = months.map<History>((month, index) => {
      const prevDate = index === 0 ? this.date : months[index - 1];
      // eslint-disable-next-line no-console
      console.log({ pd: prevDate.toISOString(), cd: month.toISOString() });
      return {
        date: month,
        quotas: this.quotas,
        debits: index,
        credits: 0,
        balance: 0,
      };
    });
  }
}

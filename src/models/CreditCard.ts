import { Credit } from './Credit';

export type CreditCard = Credit & {
  cardNumber: string,
};

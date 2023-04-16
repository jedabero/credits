import { Credit } from './Credit';
import { Movement } from './Movement';

export type CreditCard = Credit & {
  movements: Movement[],
};

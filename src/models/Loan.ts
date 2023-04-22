import { Credit } from './Credit';

export type Loan = Credit & {
  loanNumber: string,
};

import mockStore from '../../__tests_helpers__/mockStore';
import { selectMovementsByCardId } from '../../src/reducers/movements';

describe('Movements reducer', () => {
  describe('Select Movements By Card Id', () => {
    test('Empty', () => {
      const store = mockStore({
        _persist: { version: 0, rehydrated: true },
        creditCards: {
          entities: {},
          ids: [],
        },
        movements: {
          entities: {},
          ids: [],
        },
      });
      const movements = selectMovementsByCardId('SOME ID')(store.getState());
      expect(movements).toMatchSnapshot();
    });
    test('Found', () => {
      const store = mockStore({
        _persist: { version: 0, rehydrated: true },
        creditCards: {
          entities: {},
          ids: [],
        },
        movements: {
          entities: {
            'SOME OTHER ID': {
              id: 'SOME OTHER ID',
              cardId: 'SOME ID',
              authNumber: '0',
              date: '',
              description: '',
              value: 1,
              monthlyRate: 0.01,
              yearlyRate: 0.01,
              quotas: 1,
            },
          },
          ids: ['SOME OTHER ID'],
        },
      });
      const movements = selectMovementsByCardId('SOME ID')(store.getState());
      expect(movements).toMatchSnapshot();
    });
  });
});

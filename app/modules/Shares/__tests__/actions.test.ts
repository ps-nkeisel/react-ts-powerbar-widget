import 'jest';
import { actions, ActionTypes } from '../sharesDuck';

describe('Actions should work correctly', () => {
  test('setCustomLinks action is called and it sends the correct parameters', () => {
    const spy = jest.spyOn(actions, 'setCustomLinks');
    const call = actions.setCustomLinks({ facebook: 'https://www.example.com' });

    expect(spy).toHaveBeenCalledWith({ facebook: 'https://www.example.com' });

    expect(call).toHaveProperty('type', ActionTypes.SET_CUSTOM_LINKS);
    expect(call).toHaveProperty('error', undefined);
    expect(call).toHaveProperty('payload');
    expect(call).toHaveProperty('payload.facebook', 'https://www.example.com');
  });

  test('setSharesCounters action is called and it sends the correct parameters', () => {
    const spy = jest.spyOn(actions, 'setSharesCounters');
    const call = actions.setSharesCounters({ facebook: 62, twitter: 30, reddit: 5, linkedin: 1 });

    expect(spy).toHaveBeenCalledWith({ facebook: 62, twitter: 30, reddit: 5, linkedin: 1 });

    expect(call).toHaveProperty('type', ActionTypes.SET_SHARES_COUNT);
    expect(call).toHaveProperty('error', undefined);
    expect(call).toHaveProperty('payload');
    expect(call).toHaveProperty('payload.facebook', 62);
    expect(call).toHaveProperty('payload.twitter', 30);
    expect(call).toHaveProperty('payload.reddit', 5);
    expect(call).toHaveProperty('payload.linkedin', 1);
  });
});

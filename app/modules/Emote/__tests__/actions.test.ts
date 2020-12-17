import 'jest';
import { actions } from '../emoteDuck';

describe('setEmote works correctly', () => {
  test('setEmote action is called and it sends the correct parameters', () => {
    const spy = jest.spyOn(actions, 'setEmote');
    const call = actions.setEmote({ key: 1, percent: 33 });

    expect(spy).toHaveBeenCalledWith({ key: 1, percent: 33 });

    expect(call).toHaveProperty('type', 'SET_EMOTE');
    expect(call).toHaveProperty('error', undefined);
    expect(call).toHaveProperty('payload');
    expect(call).toHaveProperty('payload.key', 1);
    expect(call).toHaveProperty('payload.percent', 33);
  });
});

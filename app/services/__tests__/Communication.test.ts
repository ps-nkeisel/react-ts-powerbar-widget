// tslint:disable:no-string-literal
import store from '~/store';
import Communication from '../Communication';

describe('Communication', () => {
  it('init() should set to initialized and attach event listener', () => {
    // Mock the windowProxy porthole object.
    Communication.windowProxy = {
      addEventListener: jest.fn(),
      post: jest.fn(),
    };
    // Initialize communication
    Communication.init();
    // Assert that the private initialized field has been in fact set to true.
    expect(Communication['initialized']).toBe(true);
    // Assert that windowProxy has assigned an event listener, and with correct params.
    expect(Communication.windowProxy.addEventListener).toHaveBeenCalled();
    expect(Communication.windowProxy.addEventListener).toHaveBeenCalledWith(Communication['listener']);
  });

  it('listener calls events and sets proper data with powerBarData', () => {
    const proxyEvtSignature = { powerbarAcknowledge: true };
    // Mock functions
    store.dispatch = jest.fn();
    // Mock windowProxy and post method to provide the valid signature.
    Communication.windowProxy = {
      addEventListener: jest.fn(),
      post: jest.fn(() => proxyEvtSignature),
    };
    // Mock event to get attached to Communication.listener.
    const mockEvt = {
      data: {
        powerBarData: {
          commentCount: 10,
          recommendations: 10,
          shares: {
            Facebook: {
              total_count: 1,
            },
            LinkedIn: 1,
            Reddit: 1,
            Twitter: 1,
          },
        },
      },
    };
    // Call the listener with the mocked event.
    Communication['listener'](mockEvt);
    // Assert that windowProxy post was called with the right signature.
    expect(Communication.windowProxy.post).toHaveBeenCalled();
    expect(Communication.windowProxy.post).toHaveBeenCalledWith(proxyEvtSignature);
    // Assert that store.dispatch was called 3 times.
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  });

  it('listener calls events and sets proper data with shareURLS', () => {
    const proxyEvtSignature = { powerBarURLAcknowledge: true };
    // Mock functions
    store.dispatch = jest.fn();
    // Mock windowProxy and post method to provide the valid signature.
    Communication.windowProxy = {
      addEventListener: jest.fn(),
      post: jest.fn(() => proxyEvtSignature),
    };
    // Mock event to get attached to Communication.listener.
    const mockEvt = {
      data: {
        shareURLS: 'http://mock-url.com',
      },
    };
    // Call the listener with the mocked event.
    Communication['listener'](mockEvt);
    expect(Communication.windowProxy.post).toHaveBeenCalled();
    expect(Communication.windowProxy.post).toHaveBeenCalledWith(proxyEvtSignature);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('listener calls events and sets proper data when comment added', () => {
    store.dispatch = jest.fn();
    // Mock event to get attached to Communication.listener.
    const mockEvt = {
      data: {
        syncWidget: {
          commentAdded: true,
        },
      },
    };
    // Call the listener with the mocked event.
    expect(store.getState().comments).toBe(0);
    Communication['listener'](mockEvt);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('listener calls events and sets proper data for most voted emote', () => {
    store.dispatch = jest.fn();
    // Mock event to get attached to Communication.listener.
    const mockEvt = {
      data: {
        syncWidget: {
          mostVotedEmote: {},
        },
      },
    };
    // Call the listener with the mocked event.
    Communication['listener'](mockEvt);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('listener calls events and sets proper data for most voted emote', () => {
    store.dispatch = jest.fn();
    // Mock event to get attached to Communication.listener.
    const mockEvt = {
      data: {
        syncWidget: {
          votes: 10,
        },
      },
    };
    // Call the listener with the mocked event.
    Communication['listener'](mockEvt);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});

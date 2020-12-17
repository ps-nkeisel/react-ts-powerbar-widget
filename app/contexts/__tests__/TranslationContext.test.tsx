import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import Communication from '~/services/Communication';
import { TranslationProvider } from '../TranslationContext';

describe('TranslationContext', () => {
  let container: ReactWrapper;

  afterEach(() => container && container.unmount());

  it('should call proxy event listener on mount', () => {
    // Define event body to assign to a mock function.
    // It's easier to define it as a variable to compare if it
    // was called as a parameter.
    const mockEvt = {
      event: {
        data: {
          customText: 'mock-string',
        },
      },
    };
    // Mock porthole events.
    Communication.windowProxy = {
      addEventListener: jest.fn(() => mockEvt),
      post: jest.fn(),
    };
    // Mount the TranslationContext.Provider to the DOM.
    container = mount(<TranslationProvider />);
    // Destructure listener.
    const listener = Communication.windowProxy.addEventListener as jest.Mock;
    expect(listener).toHaveBeenCalled();
    expect(listener.mock.results[0].value).toEqual(mockEvt);
  });
});

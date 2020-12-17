import 'jest';

import { mount } from 'enzyme';
import React from 'react';
import Emote from '../Emote';

import articleConfig from 'config/article.config';
import { Provider } from 'react-redux';
import store from 'store';

import { generateTheme } from '@vuukle/widget-theme';
import { ThemeProvider } from 'styled-components';

import comms from 'services/Communication';

const theme = generateTheme(articleConfig.theme, false);

describe('Emote component testing', () => {
  let mounted: any;

  beforeEach(() => {
    mounted = mount(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Emote />
        </Provider>
      </ThemeProvider>
    );
  });

  test('Component should mount', () => {
    expect(mounted).toMatchSnapshot();
  });

  test('Component should react to an emote click without throwing an error', () => {
    const spy = jest.spyOn(comms, 'sendScrollTo');

    mounted.find('a').simulate('click');
    expect(spy).toBeCalled();
    // expect(spy).not.toThrow();
  });
});

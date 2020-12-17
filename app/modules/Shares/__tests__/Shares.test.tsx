import 'jest';

import { mount } from 'enzyme';
import React from 'react';
import Shares from '../Shares';

import articleConfig from 'config/article.config';
import { Provider } from 'react-redux';
import store from 'store';

import { generateTheme } from '@vuukle/widget-theme';
import { ThemeProvider } from 'styled-components';

const theme = generateTheme(articleConfig.theme, false);

describe('Shares component testing', () => {
  test('Component should mount', () => {
    const mounted = mount(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Shares />
        </Provider>
      </ThemeProvider>
    );
    expect(mounted).toMatchSnapshot();
  });
});

import 'jest';

import { mount } from 'enzyme';
import React from 'react';
import MoreSharesButton from '../MoreSharesButton';

import articleConfig from 'config/article.config';
import { Provider } from 'react-redux';
import store from 'store';

import { generateTheme } from '@vuukle/widget-theme';
import { ThemeProvider } from 'styled-components';

const theme = generateTheme(articleConfig.theme, false);

describe('MoreSharesButton component testing', () => {
  test('Component should mount', () => {
    const mounted = mount(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MoreSharesButton />
        </Provider>
      </ThemeProvider>
    );
    expect(mounted).toMatchSnapshot();
  });

  test(`Component should have 3 share buttons when it's not opened`, () => {
    const mounted = mount(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MoreSharesButton isOpened={false} />
        </Provider>
      </ThemeProvider>
    );
    expect(mounted.find('svg path')).toHaveLength(3);
  });

  test(`Component should have only 1 share button when it's opened`, () => {
    const mounted = mount(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MoreSharesButton isOpened={true} />
        </Provider>
      </ThemeProvider>
    );
    expect(mounted.find('svg path')).toHaveLength(1);
  });
});

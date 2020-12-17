import 'jest';

import { mount } from 'enzyme';
import React from 'react';
import ExpandButton from '../ExpandButton';

import articleConfig from 'config/article.config';
import { Provider } from 'react-redux';
import store from 'store';

import { generateTheme } from '@vuukle/widget-theme';
import { ThemeProvider } from 'styled-components';

const theme = generateTheme(articleConfig.theme, false);

describe('ExpandButton component testing', () => {
  test('Component should mount', () => {
    const jsx = (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ExpandButton
            onClick={() => {
              return;
            }}
            toggled={false}
          />
        </Provider>
      </ThemeProvider>
    );
    const mounted = mount(jsx);

    expect(mounted).toMatchSnapshot();
    mounted.unmount();
  });

  test('Component toggled text should be an X', () => {
    const jsx = (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ExpandButton
            onClick={() => {
              return;
            }}
            toggled={true}
          />
        </Provider>
      </ThemeProvider>
    );
    const mounted = mount(jsx);

    expect(mounted).toMatchSnapshot();
    const spanText = mounted.find('span').text();
    expect(spanText).toBe('X');
    mounted.unmount();
  });

  test('Component not toggled text should be Share', () => {
    const jsx = (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ExpandButton
            onClick={() => {
              return;
            }}
            toggled={false}
          />
        </Provider>
      </ThemeProvider>
    );
    const mounted = mount(jsx);

    expect(mounted).toMatchSnapshot();
    const spanText = mounted.find('span').text();
    expect(spanText).toBe('Share');
    mounted.unmount();
  });
});

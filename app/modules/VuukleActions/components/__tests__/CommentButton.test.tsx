import 'jest';

import { mount } from 'enzyme';
import React from 'react';
import CommentButton from '../CommentButton';

import articleConfig from 'config/article.config';
import { Provider } from 'react-redux';
import store from 'store';

import { generateTheme } from '@vuukle/widget-theme';
import { ThemeProvider } from 'styled-components';

const theme = generateTheme(articleConfig.theme, false);

describe('CommentButton component testing', () => {
  test('Component should mount', () => {
    const jsx = (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CommentButton
            count={0}
            onClick={() => {
              return;
            }}
          />
        </Provider>
      </ThemeProvider>
    );
    const mounted = mount(jsx);

    expect(mounted).toMatchSnapshot();
    mounted.unmount();
  });

  test('Component should contain a button when the circle is true', () => {
    const jsx = (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CommentButton
            count={0}
            onClick={() => {
              return;
            }}
            circle={true}
          />
        </Provider>
      </ThemeProvider>
    );
    const mounted = mount(jsx);

    expect(mounted).toMatchSnapshot();
    expect(mounted.find('button').length).toBe(1);
    mounted.unmount();
  });

  test('Component should show the correct count', () => {
    const jsx = (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CommentButton
            count={25}
            onClick={() => {
              return;
            }}
          />
        </Provider>
      </ThemeProvider>
    );
    const mounted = mount(jsx);

    expect(mounted).toMatchSnapshot();
    expect(mounted.find('span').text()).toBe('25');
    mounted.unmount();
  });
});

/**
 * @file This is the entry file for the application, only setup and boilerplate
 * code.
 */
import './polyfills';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { TranslationProvider } from '~/contexts/TranslationContext';
import WatchHeight from '~/services/WatchHeight.tsx';
import store from './store';

import articleConfig from '~/config/article.config';
import App from '~/modules/App';

/* ========================================================
 * 💅 Global Styles
======================================================== */
import { generateGlobalStyles, generateTheme } from '@vuukle/widget-theme';
const theme = generateTheme(articleConfig.theme, false);
const GlobalStyles = generateGlobalStyles(theme);

/* ========================================================
👂 Listen for messages from parent and apply changes to our
app state
======================================================== */
import Communication from '~/services/Communication';
Communication.init(); // TODO: pass store mb to communication to prevent it's import

/* ========================================================
 * 🏞️ Render React App
======================================================== */
const MOUNT_NODE = document.getElementById('app');

const Wrapper = () => {
  return (
    <TranslationProvider>
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <div>
            <GlobalStyles />
            <App />
          </div>
        </ReduxProvider>
      </ThemeProvider>
    </TranslationProvider>
  );
};

const render = () => ReactDOM.render(<Wrapper />, MOUNT_NODE);

if ((module as any).hot && MOUNT_NODE instanceof HTMLElement) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  (module as any).hot.accept('./modules/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

/* ========================================================
 Ohh!😱 And one more... we need to watch height of the app since
 we will be rendered inside iframe
======================================================== */
if (MOUNT_NODE !== null) {
  WatchHeight.init(MOUNT_NODE);
}

/* ========================================================
* and one more... 😃 Log Vuukle Initialization
======================================================== */
// tslint:disable-next-line
console.log(
  `%c[VUUKLE] Powerbar widget initialized! Version: ${
    process.env.VERSION
  }. Need help? Reach us at support[at]vuukle[dot]com`,
  'color:#039BE5;'
);

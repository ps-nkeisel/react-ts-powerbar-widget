import { mount } from 'enzyme';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import VuukleActions from '~/modules/VuukleActions';
import store from '~/store';

describe('recommendations', () => {
  it('toggleRecommend should update recommendation count', () => {
    // Create tree with Provider.
    const App = () => (
      <ReduxProvider store={store}>
        <VuukleActions />
      </ReduxProvider>
    );
    // Mount App.
    const container = mount(<App />);
    // Span with given data-testid, should only appear when it's value is at least 1.
    expect(container.find('[data-testid="recommendations-count"]')).toEqual({});
    // Find button and simulate click.
    const button = container.find('button[data-content="Recommend"]');
    button.simulate('click');
    expect(container.find('[data-testid="recommendations-count"]').text()).toBe('1');
  });
});

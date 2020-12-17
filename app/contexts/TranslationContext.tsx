import React from 'react';

import mergeDeepRight from 'ramda/src/mergeDeepRight';
import path from 'ramda/src/path';
import Communication from 'services/Communication';

interface ITranslation {
  readonly recommend: string;
  readonly share: string;
  readonly shares: string;
}

const defaultTranslation = {
  recommend: 'Recommend',
  share: 'Share',
  shares: 'Shares',
};

const TranslationContext = React.createContext(defaultTranslation);

class TranslationProvider extends React.Component<{}, ITranslation> {
  public state: ITranslation = defaultTranslation;

  public componentDidMount(): void {
    // Listen for message from platform that will send needed translation
    Communication.windowProxy.addEventListener((event) => {
      if (path(['data', 'customText'], event)) {
        const updatedTranslation = mergeDeepRight(this.state, event.data.customText);
        this.setState(updatedTranslation as ITranslation);
      }
    });
  }

  public render() {
    const { children } = this.props;
    return <TranslationContext.Provider value={this.state}>{children}</TranslationContext.Provider>;
  }
}

export default TranslationContext;
export { TranslationProvider };

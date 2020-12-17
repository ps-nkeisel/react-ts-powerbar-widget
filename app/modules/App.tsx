import * as React from 'react';

import styled, { css, CSSObject } from 'styled-components';

import articleConfig from '~/config/article.config';
import Emote from '~/modules/Emote';
import Shares from '~/modules/Shares';
import VuukleActions from '~/modules/VuukleActions';
import withExpandButton from '~/modules/WithExpandButton';

const Layout = styled.div<Props>`
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  ${() =>
    articleConfig.mode === 'vertical' &&
    `
    flex-direction: column;
    align-items: flex-start;
  `};
  ${(props) => props.styles && css(props.styles as CSSObject)}
`;

interface IProps {
  className?: string;
}

interface IMapProps {
  styles: object;
}

type Props = IProps & IMapProps;

const App: React.FC<Props> = (props) => {
  // Based on standalone mode param detect with which widgets our App is loaded to know what to show/hide.
  const showEmotes = articleConfig.standalone !== 3 && articleConfig.standalone !== 1;
  const showVuukleActions = articleConfig.standalone !== 1 && articleConfig.standalone !== 2;

  return (
    <Layout {...props}>
      {showVuukleActions && <VuukleActions />}
      <Shares />
      {showEmotes && <Emote style={{ marginLeft: '5px' }} />}
    </Layout>
  );
};

export default withExpandButton(App);

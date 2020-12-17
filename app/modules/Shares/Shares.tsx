import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootStore } from 'store';
import { ISharesState, toggleShares } from './sharesDuck';

import ShareItemsList from './components/ShareItemsList';
import Wrapper from './components/StyledWrapper';

import Communication from '~/services/Communication';
import MoreSharesButton from './components/MoreSharesButton';
import { openShareWindow } from './utils';

import articleConfig from '~/config/article.config';

interface IProps {
  className?: string;
}

interface IStateProps {
  shares: ISharesState;
}

interface IDispatchProps {
  handleToggleShareClick: () => any;
}

type Props = IProps & IStateProps & IDispatchProps;

const SharesContainer: React.FC<Props> = ({ className, shares, handleToggleShareClick, ...props }) => {
  const handleShareClick = (social: SocialName) => {
    Communication.sendLogShare(social);
    // When share interceptor is given, it will be called from the above `sendLogShare` function instead
    if (!articleConfig.enableInterceptor) {
      openShareWindow(social);
    }
    return true;
  };

  return (
    <Wrapper className={className} toggled={shares.toggled} {...props}>
      <ShareItemsList items={shares.items} onClick={handleShareClick} />
      <MoreSharesButton onClick={handleToggleShareClick} isOpened={shares.toggled} className="more-btn" />
    </Wrapper>
  );
};

const mapStateToProps = ({ shares }: RootStore) => ({ shares });
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ handleToggleShareClick: toggleShares }, dispatch);

export default connect<IStateProps, IDispatchProps, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(SharesContainer);

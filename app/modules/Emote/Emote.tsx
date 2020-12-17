import * as React from 'react';
import { connect } from 'react-redux';

import EmoteItem from './components/EmoteItem';

import { RootStore } from '~/store';
import { IMostVotesState } from './emoteDuck';

import articleConfig from '~/config/article.config';
import Communication from '~/services/Communication';

interface IProps {
  className?: string;
  style?: any;
  sharesToggled?: boolean;
}

interface IStateProps {
  emote: IMostVotesState;
  sharesToggled: boolean;
}

type Props = IProps & IStateProps;

const Emote: React.FC<Props> = ({ emote, sharesToggled, className }) => {
  if (sharesToggled || !emote) {
    return null;
  }

  const handleEmoteItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    Communication.sendScrollTo('emotes');
  };

  return (
    <EmoteItem
      className="vuukle-emote"
      percentage={emote.votesPercentage}
      keyName={emote.key}
      onClick={handleEmoteItemClick}
      customConfig={{ img: articleConfig.images, name: articleConfig.names }}
      displayMode={articleConfig.mode}
    />
  );
};

const mapStateToProps = ({ emote, shares }: RootStore) => ({
  emote,
  sharesToggled: shares.toggled,
});
export default connect<IStateProps>(mapStateToProps)(Emote);

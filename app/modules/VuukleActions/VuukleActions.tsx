import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TranslationContext from '~/contexts/TranslationContext';

import { RootStore } from '~/store';
import { toggleRecommend } from './ducks/recommendations';

import Tooltip from '@vuukle/tooltip';
import articleConfig from '~/config/article.config';
import Communication from '~/services/Communication';

import CommentButton from './components/CommentButton';
import LikeButton from './components/LikeButton';
import StyledWrapper from './components/StyledWrapper';

interface IProps {
  className?: string;
}

interface IMapProps {
  comments: number;
  recommendations: RootStore['recommendations'];
}

interface IDispatchProps {
  onRecommendClick: () => void;
}

type Props = IProps & IMapProps & IDispatchProps;

const Actions: React.FC<Props> = ({ className, comments, recommendations, onRecommendClick }) => {
  const likeButtonProps = {
    active: recommendations.voted,
    circle: articleConfig.mode === 'vertical',
    count: recommendations.count,
    disabled: recommendations.loading,
    onClick: () => onRecommendClick(),
  };

  return (
    <StyledWrapper className="vuukle-actions">
      <CommentButton
        onClick={() => Communication.sendScrollTo('comments')}
        count={comments}
        circle={articleConfig.mode === 'vertical'}
        className="vuukle-comment"
      />
      {articleConfig.mode === 'horizontal' ? (
        <TranslationContext.Consumer>
          {({ recommend }) => (
            <Tooltip placement="right" content={recommend}>
              <LikeButton {...likeButtonProps} />
            </Tooltip>
          )}
        </TranslationContext.Consumer>
      ) : (
        <LikeButton {...likeButtonProps} />
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ comments, recommendations }: RootStore) => ({ comments, recommendations });

export default connect<IMapProps, IDispatchProps, IProps>(
  mapStateToProps,
  (dispatch: any) => bindActionCreators({ onRecommendClick: toggleRecommend }, dispatch)
)(Actions);

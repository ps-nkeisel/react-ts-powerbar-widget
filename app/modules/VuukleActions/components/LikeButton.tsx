import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import Badge from '@vuukle/badge';

interface IProps {
  /** Number of likes */
  count: number;
  /** Click event function */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Highlight button if user liked article
   * @default false
   */
  active?: boolean;
  /**
   * Display button as circle for 'vertical' mode. In horizontal it's
   * displayed half rounded as pair for `CommentButton` component
   * @default false
   */
  circle?: boolean;
  /**
   * Button is disabled or not. Used in case when API is in loading state to
   * prevent user click many times
   * @default false
   */
  disabled?: boolean;
  className?: string;
}

/**
 * Heart icon for LikeButton component
 */
const Icon = (
  <svg viewBox="0 0 24 24">
    {/* tslint:disable-next-line */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.217 23.217">
      <path d="M11.608,21.997c-22.647-12.354-6.268-27.713,0-17.369C17.877-5.716,34.257,9.643,11.608,21.997z" />
    </svg>
  </svg>
);

/**
 * @render react
 * @name LikeButton
 * @description Button with heart icon and count. Used to allow user to recommend article
 */
const LikeButton: React.FunctionComponent<IProps> = ({ count, active = false, circle = false, ...props }) => {
  return circle ? (
    <Badge count={count}>
      <button {...props} className={props.className + ' vuukle-recommend'}>{Icon}</button>
    </Badge>
  ) : (
    <button {...props} className={props.className + ' vuukle-recommend'}>
      {Icon}
      {count > 0 && <span data-testid="recommendations-count">{count}</span>}
    </button>
  );
};

/** Animation for svg to demonstrate like */
const heartLike = keyframes`
  50% {
    transform: scale(1.2);
  }
`;

/** Animation for svg to demonstrate removed like */
const heartUnlike = keyframes`
  50% {
     transform: scale(0.75);
  }
`;

/** Wrapper for LikeButton to insert styles */
const StyledCommentButton = styled(LikeButton)<IProps>`
  min-width: 35px;
  width: auto;
  max-width: 90px;
  border-radius: ${(props) => (props.circle ? '50%' : '0 16px 16px 0')};
  margin-right: 1px;
  user-select: none;
  border: none;
  background-color: ${(props) => (props.active ? '#f42' : '#9d9d9d')};
  color: #fff;
  padding: 8px;
  transition: all 0.2s;
  font-size: 0.8rem;
  outline: none;

  svg {
    width: 16px;
    height: 16px;
    fill: #fff;
    vertical-align: middle;
    overflow: visible;
    animation: ${(props) => (props.active ? heartLike : heartUnlike)} 0.25s;
  }

  span {
    margin-left: 5px;
    vertical-align: middle;
  }

  @media (hover: hover) {
    &:hover {
      background-color: ${(props) => (props.active ? '#f42' : '#9d9d9d')};
    }
  }
`;

export default StyledCommentButton;

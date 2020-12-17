import * as React from 'react';
import styled from 'styled-components';

import Badge from '@vuukle/badge';

interface IProps {
  /**
   * On button click
   * @default undefined
   */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Number of comments
   * @default 0
   */
  count: number;
  /**
   * Determines if display button as circle or half rounded (pair for LikeButton component)
   * @default false
   */
  circle?: boolean;
  /**
   * Disable button
   * @default false
   */
  disabled?: boolean;
  className?: string;
}

/**
 * Comment icon for CommentButton component
 */
const Icon = (
  <svg viewBox="0 0 24 24">
    {/* tslint:disable-next-line */}
    <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
  </svg>
);

/**
 * @render react
 * @name CommentButton
 * @description Button with icon and count of comments
 */
const CommentButton: React.FunctionComponent<IProps> = ({ count = 0, circle = false, ...props }) =>
  circle ? (
    <Badge count={count}>
      <button {...props}>{Icon}</button>
    </Badge>
  ) : (
    <button {...props}>
      {Icon}
      {count > 0 && <span>{count}</span>}
    </button>
  );

/** Wrapper for CommentButton to insert styles */
const StyledCommentButton = styled(CommentButton)<IProps>`
  min-width: 35px;
  width: auto;
  max-width: 90px;
  ${(props) => (props.circle ? `border-radius: 50%;` : `border-radius: 16px 0 0 16px;`)};
  margin-right: 1px;

  user-select: none;
  border: none;
  background-color: #f42;
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
  }

  span {
    margin-left: 5px;
    vertical-align: middle;
  }
`;

export default StyledCommentButton;

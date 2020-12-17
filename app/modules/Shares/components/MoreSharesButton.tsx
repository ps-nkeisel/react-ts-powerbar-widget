import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  /** Click event function */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * More shares is toggled or not
   * @default false
   */
  isOpened?: boolean;
  className?: string;
}

/**
 * @render react
 * @name MoreSharesButton
 * @description Button to toggle share buttons
 */
const MoreSharesButton: React.FunctionComponent<IProps> = ({ isOpened = false, ...props }) => (
  // tslint:disable max-line-length
  <button {...props}>
    {isOpened ? (
      <svg viewBox="0 0 24 24">
        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 210 210">
        <path
          id="XMLID_104_"
          d="M115,0H95c-8.284,0-15,6.716-15,15v20c0,8.284,6.716,15,15,15h20c8.284,0,15-6.716,15-15V15   C130,6.716,123.284,0,115,0z"
        />
        <path
          id="XMLID_105_"
          d="M115,80H95c-8.284,0-15,6.716-15,15v20c0,8.284,6.716,15,15,15h20c8.284,0,15-6.716,15-15V95   C130,86.716,123.284,80,115,80z"
        />
        <path
          id="XMLID_106_"
          d="M115,160H95c-8.284,0-15,6.716-15,15v20c0,8.284,6.716,15,15,15h20c8.284,0,15-6.716,15-15v-20   C130,166.716,123.284,160,115,160z"
        />
      </svg>
    )}
  </button>
);

/** Wrapper for MoreSharesButton to insert styles */
const StyledMoreSharesButton = styled(MoreSharesButton)`
  outline: 0;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: none;
  border-radius: 50%;
  background-color: #f42;
  color: #fff;
  padding: 8px;
  transition: all 0.2s;
  font-size: 0.8rem;
  width: 32px;
  height: 32px;
  svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }
`;

export default StyledMoreSharesButton;
